import React, {useEffect, useState} from 'react';
import {PageHeader, ListGroup} from 'react-bootstrap';
import {API} from 'aws-amplify';
import './Mood.css';

//GAHH DON'T DO THIS TO YOURSELF KATIE, YOU CANNOT USE ASYNC ON THIS CONTAINER 

export default function Mood (props) {

    const [moods, setMoods] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log('sub:', props.sub);
        console.log('email:', props.email);
        async function onLoad() {
            if(!props.isAuthenticated) {
                return;
            }

            try {
                const moods = await loadMoods();
                console.log(moods);
                setMoods(moods);
            } catch(e) {
                alert(e);
            }
            setIsLoading(false);
        }
        onLoad();
    }, [props.isAuthenticated]);

    function loadMoods() {
        return API.get('moods', '/moods?email=' + props.email);
    }

    function renderMoodsList(moods) {
        return null;
    }

    function renderLander() {
        return (
            <div className = "lander">
                <h1>I AM</h1>
                <p>Your moods are comiling themselves...</p>
            </div>
        )
    }

    function renderMoods() {
        return (
            <div className = "moods" >
                <PageHeader>Your Moods</PageHeader>
                <ListGroup>
                    {!isLoading && renderMoodsList(moods)}
                </ListGroup>
                {/* React cards?  */}
            </div>
        )
    }

    if(!props.sub || !props.email){
    return (
        <div>
            Hmm.. user isn't authenticated. Try to sign in again?
        </div>
    )
    }

    return (
        <div>
            <div className = "Moods">
                {props.isAuthenticated ? renderMoods() : renderLander()}
                {props.sub} {props.email}
            </div>
        </div>
    )
}