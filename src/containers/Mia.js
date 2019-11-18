import React, {Component, useState} from 'react'; //useState
import {FormGroup, FormControl} from 'react-bootstrap';
import Amplify, {Interactions, API} from 'aws-amplify'; //Interactions API
import {ChatBot, AmplifyTheme} from 'aws-amplify-react';
import LoaderButton from '../components/LoaderButton';
import './Mia.css';
import awsconfig from '../config';

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

export default class Mia extends Component { // use Component when going back to bot
    

    render() {
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
            </div>
        )
    }
}