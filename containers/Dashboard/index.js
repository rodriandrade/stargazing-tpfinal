import {Container, Posts, FormContainer, UserCont} from './styles';
import { useProtected } from 'lib/useProtected';
import { AddForm } from 'components'
import React, { useState, useEffect } from 'react';
import { db } from "lib/firebase";
import { LocationCard } from 'components'

const Dashboard = () => {

    const [userData, setUserData] = useState(null);
    const [userPosts, setUserPosts] = useState(null);

    //Para proteger una ruta
    const auth = useProtected();
    if (!auth.user) return null;

    const getUserData = () =>{
        var docRef = db.collection("users").doc(auth.user.id);
        docRef.get().then(function(doc) {
            const userDataFirebase = doc.data();
            const favs = userDataFirebase.favoritos;
            setUserData(favs)
            const posts = userDataFirebase.posts;
            posts.map(post => console.log(post))
            setUserPosts(posts);
        })
    }

    return (
        <>
        <h1>DASHBOARD - {auth.user.email}</h1>
        <Container> 
            <FormContainer>
                <h3>Add a new location!</h3>
                <AddForm userId={auth.user.id}/>
            </FormContainer>
            <UserCont>
            <h3 onClick={getUserData}>Post favoritos</h3>
                {userData&&
                    userData.map(item => <LocationCard key={item.id} data={item} />)
                }
            <h3 onClick={getUserData}>Posts creados</h3>
                { userPosts&&
                    userPosts.map(item => <p>{item.name}</p>) 
                }
            </UserCont>
        </Container>
        </>
    )
}

export default Dashboard