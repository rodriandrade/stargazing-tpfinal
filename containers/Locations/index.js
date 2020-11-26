import {Container, Title} from './styles';
import { LocationCard } from 'components'
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { db } from "lib/firebase";

const Locations = () => {

    const [locations, setLocations] = useState([]);
/*
    useEffect(() => {
        const fetchLocations = async () => {
            try{
                const res = await axios.get('https://stargazing-map-api-rest.now.sh/locations')
                const data = res.data;
                console.log(data)
                setLocations(data)
            }
            catch(error){
                console.log(error)
            }
        }
        fetchLocations();
    }, []) 

    
    */

    useEffect(() => {
        const fetchLocations = () => {
            try{
                let posts = [];
                db.collection("posts").get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        const post = { id: doc.id, ...doc.data()}
                        console.log("ESTO ES UN POST", post)
                        posts.push(post)
                    });
                setLocations(posts)
                });
            }
            catch(error){
                console.log(error)
            }
        }
        fetchLocations();
    }, []) 

    return (
        <Container>
            <Title>LOCATIONS</Title>
            {locations.map(location => <LocationCard key={location.id} data={location} />)}
        </Container>
    )
}

export default Locations