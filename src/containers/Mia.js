import React, {useEffect, useState} from 'react';
import Amplify, {Interactions} from 'aws-amplify';
import {ChatBot, AmplifyTheme} from 'aws-amplify-react';
import './Mia.css';
import awsconfig from '../config';

//GAHH DON'T DO THIS TO YOURSELF KATIE, YOU CANNOT USE ASYNC ON THIS CONTAINER 


Amplify.configure ({
    ...awsconfig,
    Interactions: {
        bots: {
            "IAM" : {
                "name" : "IAM",
                "alias" : "$LATEST",
                "region" : "us-west-2"
            }
        }
    }
});

const myTheme = {
    ...AmplifyTheme,
    sectionHeader: {
        ...AmplifyTheme.sectionHeader,
        backgorundColor: '#ff6600'
    }
};

export default function Mia(props) {

    const[nameSent, setnameSent] = useState(false);

    useEffect(() => {
        console.log(props);
        console.log('sub', props.sub);
        console.log('email:', props.email);
        async function sendThing() {
            const response = await Interactions.send('IAM', 'Hi Mia');
            const email = await Interactions.send('IAM', props.email);
            console.log(response.message);
            console.log(email.message);
        }
        console.log(nameSent);
        if(!nameSent) {
            sendThing();
            setnameSent(true);
        } 
    }, []);

    if(!props.sub || !props.email) {
        return (
            <div>
                Hmm... user isn't authenticated. Try to sign in again?
            </div>
        )
    }

    return (
        <div className="App">
            <header className = "App=header" >
                <h3 className = "App-title">Please greet Mia to start a conversation</h3>
            </header>
            <ChatBot 
            title="MIA"
            theme={myTheme}
            botName="IAM"
            clearOnComplete={true}
            conversationModeOn={false}
            />
            {props.sub} {props.email}
        </div>
    )
}