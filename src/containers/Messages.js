import React, {useState, useEffect} from 'react';
import {PageHeader, ListGroup, ListGroupItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {API} from 'aws-amplify';
import './Messages.css';

export default function Messages(props) {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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
        return API.get('messages', '/messages');
    }

    function renderMessagesList(messages) {
        return [{}].concat(messages).map((message, i) => 
            i !== 0 ? (
                <LinkContainer key = {message.messageID} to = {`/messages/${message.messageID}`}>
                    <ListGroupItem header = {message.content.trim().split('\n')[0]}>
                        {"Created:" + new Date(message.createdAt).toLocaleString()}
                    </ListGroupItem>
                </LinkContainer>
            ) : (
                <LinkContainer key = "new" to = "/mia">
                    <ListGroupItem>
                        <h4>
                            <b>{'\uFF0B'}</b> Create a new message
                        </h4>
                    </ListGroupItem>
                </LinkContainer>
            )
        );
    }

    function renderLander() {
        return (
            <div className = "lander">
                <h3>Please sign in to display your chat history with Mia</h3>
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