import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { Container } from './styles'

const EditForm = ({values, handleEditFormClose}) => {
    const {id, user_id, name, country, description, lat, lng, link, type} = values
    const [message, setMessage] = useState('');
    return (
        <Container>
            <Formik
                initialValues={{ name, country, description, link, lat, lng, type }}
                validate={values => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = 'Requerido';
                    }
                    if (!values.country) {
                        errors.country = 'Requerido';
                    }
                    if (!values.description) {
                        errors.description = 'Requerido';
                    }
                    if (!values.link) {
                        errors.link = 'Requerido';
                    }
                    if (!values.lat) {
                        errors.lat = 'Requerido';
                    }
                    if (!values.lng) {
                        errors.lng = 'Requerido';
                    }
                    if (!values.type) {
                        errors.type = 'Requerido';
                    }
                    return errors;
                }}
                onSubmit={
                    async (values, { setSubmitting }) => {
                        try {
                            const res = await axios.post('/api/posts/edit', {...values, id, user_id})
                            const data = await res.data
                            setSubmitting(false);
                            setMessage(`Post edited, ${data.title} (${res.status})`)
                            handleEditFormClose()
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
                        <Field type="text" name="name" placeholder="Name" />
                        <ErrorMessage name="name" component="div" />
                    </div>

                    <div className="input_row">
                        <Field type="text" name="country" placeholder="Country" />
                        <ErrorMessage name="country" component="div" />
                    </div>

                    <div className="input_row">
                        <Field type="text" name="link" placeholder="Website" />
                        <ErrorMessage name="link" component="div" />
                    </div>

                    <div className="input_row">
                        <Field type="text" name="type" placeholder="Type" />
                        <ErrorMessage name="type" component="div" />
                    </div>

                    <div className="input_row">
                        <Field type="text" name="lat" placeholder="Lat" />
                        <ErrorMessage name="lat" component="div" />
                    </div>

                    <div className="input_row">
                        <Field type="text" name="lng" placeholder="Lng" />
                        <ErrorMessage name="lng" component="div" />
                    </div>

                    <div className="input_row">
                        <Field as="textarea" type="content" name="description" placeholder="Description" />
                        <ErrorMessage name="description" component="div" />
                    </div>

                    <button type="submit" disabled={isSubmitting}>
                        Enviar
                    </button>
                </Form>
                )}
            </Formik>
            <p>{message}</p>
        </Container>
    )
}

export default EditForm;