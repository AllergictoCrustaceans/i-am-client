import React, {Component, useState} from 'react'; //useState
import {FormGroup, FormControl} from 'react-bootstrap';
import Amplify, {Interactions, API} from 'aws-amplify'; //Interactions API
import {ChatBot, AmplifyTheme} from 'aws-amplify-react';
import LoaderButton from '../components/LoaderButton';
import './Mia.css';
// import config from '../aws-exports';

// Amplify.configure ({config});

// const myTheme = {
//     ...AmplifyTheme,
//     sectionHeader: {
//         ...AmplifyTheme.sectionHeader,
//         backgorundColor: '#ff6600'
//     }
// };

// let userInput = "testing";
// const response = Interactions.send('IAM', userInput);
// console.log(response.message);

export default function Mia(props) { // use Component when going back to bot
    
    // let userInput = "Testing";
    // const response = await Interactions.send('IAM', userInput);
    // console.log(response.message);
    // constructor(props) {
    //     super(props);
    //     this.handleComplete = this.handleComplete.bind(this);
    // }

    // handleComplete(e, confirmation) {
    //     if(e) {
    //         console.log(e);
    //         return;
    //     } else {
    //         alert('Success:' + JSON.stringify(confirmation, null, 2));
    //         return 'So we can talk now, huh? Sweet.';
    //     }
        
    // }
    // render() {
    //     return (
    //         <div className="App">
    //             <header className = "App=header" >
    //                 <h3 className = "App-title">Please greet Mia to start a conversation</h3>
    //             </header>
    //             <ChatBot 
    //                 title="MIA"
    //                 theme={myTheme}
    //                 botName="IAM_test"
    //                 // onComplete={this.handleComplete.bind(this)}
    //                 clearOnComplete={true}
    //                 conversationModeOn={false}
    //             />
    //         </div>
    //     )
    // }

    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return content.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            await createMessage({content}); 
            props.history.push('/mia');
        } catch(e) {
            alert(e);
            setIsLoading(false);
        }
    }

    function createMessage(message) {
        return API.post('mia', '/mia', {
            body: message
        })
    }

    return (
        <div className = "Mia">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId = "content">
                    <FormControl
                        value={content}
                        componentClass="textarea"
                        onChange={e => setContent(e.target.value)}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    bsStyle="primary"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Submit
                </LoaderButton>
            </form>
        </div>
    )
}