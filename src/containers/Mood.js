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

    // function renderMoodsList(moods) {
    //     return (
    //         <div className = "card-container" >
    //             <div className="card-body">
    //                 <div className = "desc">
    //                     {
    //                         moods[0].topic &&
    //                     <h2 className = "moods__value">{moods[0].topic}</h2>
    //                     }
    //                     {
    //                         moods[0].overallSentiment &&
    //                     <h2 className = "moods__value">{moods[0].overallSentiment}</h2>
    //                     }
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

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
                return (

                    <div key={index}>
                        {mood.topic} 
                        {mood.overallSentiment}
                    </div>
                )
            })
        } 
        // return (
        //     <div className = "moods" >
        //         <PageHeader>Your Moods</PageHeader>
        //         <ListGroup>
        //             {!isLoading && renderMoodsList(moods)}
        //         </ListGroup>
                
        //     </div>
        // );
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
                {props.isAuthenticated ? renderMoods() : renderLander()}
            </div>
        </div>
    )
}