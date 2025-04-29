import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css'
import ShowPrompt from './components/Prompt'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import OutputPage from './components/OutputPage';
import GarlicImage from './assets/Garlic-image.png';
import PhoneImage from './assets/Phone-image.png';
import TypeWriterButton from './assets/Type-Writer-Button.png'

//Below separate for testing purposes
import NavBar from './components/NavBar'


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
        let UserInput = document.getElementsByClassName("InputFieldPrompt").value
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

    //Parameters for the prompt card.
    const promptData = {
        dispPrompt: prompt,
        dispPhoneImage: PhoneImage,
        dispGarlicImage: GarlicImage,
    }

    const navBarData = {
        PageName: "Input Page",
        dispGarlicImage: GarlicImage,
    }
    return (
        <div>
            <NavBar dispGarlicImage={navBarData.dispGarlicImage} PageName = {navBarData.PageName}/>
            <ShowPrompt dispPrompt={promptData.dispPrompt} dispPhoneImage={promptData.dispPhoneImage} dispGarlicImage={promptData.dispGarlicImage} />

            <Card style={{ width: '0rem' }}>
                <Card.Body>
                    <input className="InputFieldPrompt" type="text"></input>

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
        </div>
    );
}

export default App
