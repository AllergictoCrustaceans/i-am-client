import React, {useEffect, useState} from 'react';
import {PageHeader} from 'react-bootstrap';

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
                const fetchMoods = await loadMoods();
                console.log("moods:", fetchMoods);
                setMoods(fetchMoods);
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

    function renderLander() {
        return (
            <div className = "lander">
                <h1>I AM</h1>
                <p>Your moods are comiling themselves...</p>
            </div>
        )
    }

    function renderMoods() {
        if(!moods) {
            return 'There are currently no moods on record.';
        } else {
            //const variable to lower case
            //if lowercase variable is positive, then show this color 
            return moods.map((mood, index) => {
                if(mood.overallSentiment === 'POSITIVE' && mood.positive >= 0.97) {
                    return (
                        <div key={index}>
                            <div className = "card-container" >
                                <div className="card-body">
                                    <div className = "desc">
                                        {
                                            mood.topic &&
                                        <h2 className = "moods__topic">{mood.topic}</h2>
                                        }
                                        {
                                            mood.positive && 
                                        <h3 className = "moods__value">{mood.positive}</h3> //node with color 
                                        }
                                        {
                                            mood.overallSentiment &&
                                        <h3 className = "moods__value">{mood.overallSentiment}</h3>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                } 
                return (
                    <div key={index}>
                        <div className = "card-container" >
                            <div className="card-body">
                                <div className = "desc">
                                    {
                                        mood.topic &&
                                    <h2 className = "moods__value">{mood.topic}</h2>
                                    }
                                    {
                                        mood.overallSentiment &&
                                    <h2 className = "moods__value">{mood.overallSentiment}</h2>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        } 
    }

    if(!props.sub || !props.email) {
        return (
            <div>
                Hmm.. user isn't authenticated. Try to sign in again?
            </div>
        )
    }

    return (
        <div>
            <div className = "Moods">
                <PageHeader>Your Moods</PageHeader>
                {props.isAuthenticated ? renderMoods() : renderLander()}
            </div>
        </div>
    )
}