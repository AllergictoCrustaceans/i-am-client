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
                let topic = mood.topic.toUpperCase();

                let style = {
                    padding:10,
                    margin: 'auto',
                    display:'block',
                    backgroundColor: 'black',
                    borderRadius: "50%",
                    width:50,
                    height:50,
                }
                //green
                if(mood.overallSentiment.toLowerCase() === 'positive') {
                    if(mood.positive >= .25 && mood.positive <= 0.5) {
                        style.backgroundColor = '#4db6ac'
                    } else if(mood.positive >= 0.51 && mood.positive <= 0.75) {
                        style.backgroundColor = '#00796b'
                    } else if(mood.positive >=0.76 && mood.positive <= 1) {
                        style.backgroundColor = '#004d40'
                    }
                //red
                } else if(mood.overallSentiment.toLowerCase() === 'negative') {
                    if(mood.negative >= 0.25 && mood.negative <= 0.5) {
                        style.backgroundColor = '#f06292'
                    } else if(mood.negative >= 0.51 && mood.negative <= 0.75) {
                        style.backgroundColor = '#e91e63'
                    } else if(mood.negative >= 0.76 && mood.negative <= 1) {
                        style.backgroundColor = '#880e4f'
                    }
                //brown
                } else if(mood.overallSentiment.toLowerCase() === 'mixed') {
                    if(mood.mixed >= 0.25 && mood.mixed <= 0.5) {
                        style.backgroundColor = '#a1887f'
                    } else if(mood.mixed >= 0.51 && mood.mixed <= 0.75) {
                        style.backgroundColor = '#795548'
                    } else if(mood.mixed >= 0.76 && mood.mixed <= 1) {
                        style.backgroundColor = '#3e2723'
                    }
                } else {
                    //blue
                    if(mood.neutral >= 0.25 && mood.neutral <= 0.5) {
                        style.backgroundColor = '#64b5f6'
                    } else if(mood.neutral >= 0.51 && mood.neutral <= 0.75) {
                        style.backgroundColor = '#2196f3'
                    } else if(mood.neutral >= 0.75 && mood.neutral <= 1) {
                        style.backgroundColor = '#0d47a1'
                    }
                }

                return (
                    <div key={index}>
                        <div className = "card-container" >
                            <div className="card-body">
                                <div className = "desc">
                                    {
                                        mood.topic &&
                                    <h2 className = "moods__value">{topic}</h2>
                                    }
                                        <p style={style}></p>
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
                {/* legend of colors + sentiment */}
                {props.isAuthenticated ? renderMoods() : renderLander()}
            </div>
        </div>
    )
}