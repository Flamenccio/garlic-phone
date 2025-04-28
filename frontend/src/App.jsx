import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import OutputPage from './components/OutputPage';
import GarlicImage from './assets/Garlic-image.png';
import PhoneImage from './assets/Phone-image.png';
import TypeWriterButton from './assets/Type-Writer-Button.png'

function App() {

    //We can use useState to fetch the current prompt from the database.
    //let prompt = "This will be the prompt loaded in from the database. ";

    const [prompt, setPrompt] = useState(0)
    const URL = 'http://localhost:5051/api/todos';
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(URL);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPrompt(data);
            } catch (error) {
                console.error('Error fetching prompt:', error);
                setPrompt("This will be the prompt loaded in from the database.");
            }
        };
        if (!prompt) {
            fetchData();
        }
    });

    const handlePushPrompt = async () => {
        let UserInput = document.getElementById("InputField").value
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                body: UserInput,
            });
            if (!response.ok) {
                throw new Error(response.status)
            }
            const updatedData = await response.text();
            setPrompt(updatedData);
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const navigateToResults = () => {
        navigate('/output');
    }

    /* 
    Generally there will be two parts: One to show the prompt, and another for the input box.
    The prompt part will just be a simple outlined box
    The input part will be a text input field and a submit button right below
    */
    return (
        <Card style={{ width: '0rem' }}>
            <Card.Body>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                }}>
                    <img
                        src={GarlicImage}
                        alt="Garlic Image"
                        style={{
                            height: '60px',
                            width: 'auto',
                            marginRight: '0'
                        }}
                    />

                    <Card.Title className="Title">Garlic Phone</Card.Title>

                    <img
                        src={PhoneImage}
                        alt=""
                        style={{
                            height: '60px',
                            width: 'auto',
                            marginLeft: '0'
                        }}
                    />

                </div>
                <Card.Text className="Text">
                    {prompt}
                </Card.Text>

                <Form.Group className="mb-3" controlId="InputField">
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>

                <div className="custom-buttons">
                    <button
                        variant="primary"
                        className="image-button"
                        style={{
                            backgroundImage: `url(${TypeWriterButton})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                        onClick={() => handlePushPrompt()}
                    >
                        <span className="button-text">Submit</span>
                    </button>

                    <button
                        variant="primary"
                        className="image-button"
                        style={{
                            backgroundImage: `url(${TypeWriterButton})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                        onClick={() => navigate('/output')}
                    >
                        <span className="button-text">Results</span>
                    </button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default App
