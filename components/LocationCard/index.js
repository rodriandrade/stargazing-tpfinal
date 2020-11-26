import { Container, EditButton, DeleteButton, Title } from './styles'
import {LikeButton, EditForm} from '../index'
import { useProtected } from 'lib/useProtected';
import React, { useState, useEffect } from 'react';
import { db } from "lib/firebase";
import Link from 'next/link'
import axios from 'axios';

const LocationCard = props => {

    const {name, country, description, lat, lng, link, type, id, user_id, likes, img} = props.data;
    const [posts, setPosts] = useState([])
    const [postToEdit, setPostToEdit] = useState('')
    
    const auth = useProtected();
    if (!auth.user) return null;
    //console.log(auth.user)

    const handleEdit = async (id) => {
        setPostToEdit(id)
    }

    const handleEditFormClose = () => {
        setPostToEdit('')
    }

    const handleDelete = async (id) => {
        try {
            const res = await axios.post('/api/posts/delete', { id })
            const data = await res.data
            //console.log(res.status)
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
        <Container>
            <Link href={`/posts/${id}`}>
                <Title>{name}</Title>
            </Link>
            <h2>{country}</h2>
            <p>{description}</p>
            <LikeButton data={props.data} userId={auth.user.id} postId={id} />
            <EditButton
                onClick={() => handleEdit(id)}
            >Edit</EditButton>
            <DeleteButton
                onClick={() => handleDelete(id)}
            >Delete</DeleteButton>
            
            {likes.length !==0 ? 
                likes.map(like => <p>@{like.nombre}</p>)
                :
                <p>El post no tiene likes.</p>
            }
           
            {id === postToEdit &&
                <EditForm values={{ id, user_id, name, country, description, lat, lng, link, type }} handleEditFormClose={handleEditFormClose}/>        
            }
        </Container> 
    )
}
export default LocationCard;