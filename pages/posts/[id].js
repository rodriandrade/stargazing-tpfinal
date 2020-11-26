import { db } from "lib/firebase";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

const SinglePost = (props) => {

    console.log(props);

    return (
        <>
        <div><h1>{props.name}</h1></div>
        <div><h3>{props.country}</h3></div>
        <div>{props.description}</div>

        <Formik
                initialValues={{ image: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.image) {
                        errors.image = 'Requerido';
                    }
                    return errors;
                }}
                onSubmit={

                    async (values, { setSubmitting }) => {
                        try {
                                const resUserData = await axios.put('api/posts/update', { postId: props.postId, pictures: values})
                                const dataUser = await resUserData.data;
                                setSubmitting(false);
                        } catch (error) {
                            if (error.response) {
                                console.log(error.response.data);
                                console.log(error.response.status);
                                console.log(error.response.headers);
                            } else if (error.request) {
                                console.log(error.request);
                            } else {
                                console.log('Error', error.message);
                            }
                            console.log(error);
                        }
                    }
                }
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="input_row">
                            <Field type="file" name="image" placeholder="Name" onChange={(event) =>{
                                setFieldValue("photo1", event.currentTarget.files[0]);
                            }} />
                            <ErrorMessage name="image" component="div" />
                        </div>
                        <button type="submit" disabled={isSubmitting} className="orange">
                            Enviar
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export const getServerSideProps = async ({ query }) => {
    
    let blogObj = {};
    let userObj = {}
    await db
        .collection('posts')
        .doc(query.id)
        .get()
        .then(async result => {
            blogObj = { name: result.data().name, country: result.data().country,description: result.data().description, user_id: result.data().user_id, postId: result.data().id }
            
            await db
                .collection('users')
                .doc(blogObj.user_id)
                .get()
                .then(result => {
                    userObj = { email: result.data().email, nombre: result.data().nombre }
                });
        });
    return {
        props: {
            name: blogObj.name,
            country: blogObj.country,
            description: blogObj.description,
            postId: query.id
            //link: userObj.email
        }
    }
}

export default SinglePost