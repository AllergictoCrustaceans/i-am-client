import React, {useState, useEffect} from 'react';
import {PageHeader, ListGroup} from 'react-bootstrap';
import {API} from 'aws-amplify';
import './Messages.css';

export default function Messages(props) {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log('sub:', props.sub);
        console.log('email:', props.email);
        async function onLoad() {
            if(!props.isAuthenticated) {
                return;
            }

            try {
                const messages = await loadMessages();
                setMessages(messages);
            } catch (e) {
                alert(e);
            }

            setIsLoading(false);
        }

        onLoad();
    }, [props.isAuthenticated]);

    function loadMessages() {
        return API.get('messages', '/messages?email=' + props.email);
    }

    function renderMessagesList(messages) {
        return;
    }

    function renderLander() {
        return (
            <div className = "lander">
                <h3>Hmm, seems like you have no history with Mia.</h3>
            </div>
        );
    }

    function renderMessages() {
        return (
            <div className = "messages">
                <PageHeader>Chatlog with Mia</PageHeader>
                <ListGroup>
                    {!isLoading && renderMessagesList(messages)}
                </ListGroup>
            </div>
        );
    }

    return (
        <div className = "Chatlog">
            {props.isAuthenticated ? renderMessages() : renderLander()}
        </div>
    )
}