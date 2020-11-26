import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {Container} from './styles'
import Image from 'next/image'
import { db } from "lib/firebase";

const MapContainer = props =>{

    const mapStyle = [
        {
            "featureType": "all",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#202c3e"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "gamma": 0.01
                },
                {
                    "lightness": 20
                },
                {
                    "weight": "1.39"
                },
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "weight": "0.96"
                },
                {
                    "saturation": "9"
                },
                {
                    "visibility": "on"
                },
                {
                    "color": "#000000"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "lightness": 30
                },
                {
                    "saturation": "9"
                },
                {
                    "color": "#29446b"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "saturation": 20
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "lightness": 20
                },
                {
                    "saturation": -20
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "lightness": 10
                },
                {
                    "saturation": -30
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#193a55"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "saturation": 25
                },
                {
                    "lightness": 25
                },
                {
                    "weight": "0.01"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "lightness": -20
                }
            ]
        }
    ]

    const mapLoaded = (mapProps, map) => {
        map.setOptions({
           styles: mapStyle
        })
     }
    
    const [locations, setLocations] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);

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

    const icons = {
        'National Park': '/park.png',
        'Observatory': '/space.png',
        'Northern Lights': '/lights.png',
        'Nature Reserve': '/nature.png',
        'Recreational Area': '/recreational.png',
    }

    const containerStyle = {
        position: 'relative',  
        width: '100%',
        height: '100%'
      }

    return(

        <Container>
            <div className="cont">
                <Map
                    google={props.google}
                    zoom={2}
                    containerStyle={containerStyle}
                    defaultOptions={{
                        disableDefaultUI: true, // disable default map UI
                        draggable: true, // make map draggable
                        keyboardShortcuts: false, // disable keyboard shortcuts
                        scaleControl: true, // allow scale controle
                        scrollwheel: true, // allow scroll wheel
                        style: mapStyle,
                    }}
                    onReady={(mapProps, map) => mapLoaded(mapProps, map)}
                    initialCenter={{ lat: 47.444, lng: -122.176}}
                >
                
                {locations.map(location => 
                    <Marker 
                        position={{ lat: location.lat, lng: location.lng}} 
                        icon={icons[location.type]}
                        animation={google.maps.Animation.DROP}
                        onClick={() => {
                            setSelectedMarker(location);
                        }}
                    />
                )}

                {selectedMarker && (
                    <InfoWindow
                        visible={true}
                        onCloseClick={() => {
                            setSelectedMarker(null);
                        }}
                        position={{
                            lat: selectedMarker.lat,
                            lng: selectedMarker.lng
                        }}
                    >
                        <h1>{selectedMarker.name}</h1>
                        <h2>{selectedMarker.country}</h2>
                    </InfoWindow>)
                }

                </Map>
            </div>

        </Container>
    )
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyCCv-2Fx1QvlvQ63l7zduRtT0LzsflGAqo"
})(MapContainer)
