import Container from './styles'
import axios from 'axios';
import { db } from "lib/firebase";
import React, { useState, useEffect } from 'react';

const LikeButton = props => {

    const { likes } = props.data

    const updateFavourites = async () =>{
        console.log(props.userId)

            try {
                var docRef = db.collection("users").doc(props.userId);
                docRef.get().then(async function(doc) {
                    if (doc.exists) {
                        const userData = doc.data();
                        const userFavourites = userData.favoritos;

                        const res = await axios.put('api/auth/user', {...props.data, user_id:props.userId, favourites: userFavourites })
                        const data = await res.data;

                        const resUserData = await axios.put('api/posts/update', { userData: userData, postId: props.postId, data: props.data})
                        const dataUser = await resUserData.data;
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });            

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
    
    
    return (
        <Container onClick={updateFavourites}>Likes: {likes.length}</Container> 
    )
}
export default LikeButton;