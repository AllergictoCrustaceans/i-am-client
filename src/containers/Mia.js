import React, {useState} from 'react';
import {FormGroup, FormControl} from 'react-bootstrap';
import {API} from 'aws-amplify';
import LoaderButton from '../components/LoaderButton';
import './Mia.css';

export default function Mia(props) {
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