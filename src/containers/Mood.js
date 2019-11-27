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
            return moods.map((mood, index) => {
                let style = {
                    padding:10,
                    margin:20,
                    display:"inline-block",
                    backgroundColor: 'black',
                    borderRadius: "50%",
                    width:50,
                    height:50,
                }
                // mood.overallSentiment === 'POSITIVE' ? style.color = 'green' : style.color = 'black';
                // (change style to be correct based on overall sentiment and number)

                if(mood.overallSentiment.toLowerCase() === 'positive') {
                    style.backgroundColor = 'green'
                } else if(mood.overallSentiment.toLowerCase() === 'negative') {
                    style.backgroundColor = 'red'
                } else if(mood.overallSentiment.toLowerCase() === 'mixed') {
                    style.backgroundColor = 'blue'
                } else {
                    style.backgroundColor = 'yellow'
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
                                        mood.positive && 
                                    <h2 className = "moods__value" style={style}></h2>
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