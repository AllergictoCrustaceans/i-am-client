import React, {Component} from 'react';
import Amplify from 'aws-amplify';
import {ChatBot, AmplifyTheme} from 'aws-amplify-react';
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
    
    // need to connect to dynamo via userID
    // send console.log userinput
    // axios to your backend, and save it. 

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