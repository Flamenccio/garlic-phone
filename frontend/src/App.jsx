import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import OutputPage from './components/OutputPage'; 

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

                <Card.Title className="Title">Garlic Phone</Card.Title>

                <Card.Text className="Text">
                    {prompt}
                </Card.Text>

                <Form.Group className="mb-3" controlId="InputField">
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>

                <Button variant="primary" onClick={() => handlePushPrompt()}>Submit</Button>

                <Button variant="primary" onClick={() => navigate('/output')}>View Results</Button>
            </Card.Body>
        </Card>
    );
}

export default App
