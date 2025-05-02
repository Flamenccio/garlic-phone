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
import ShowPrompt from './components/Prompt'
import NavBar from './components/NavBar'


function App() {

    //We can use useState to fetch the current prompt from the database.
    //let prompt = "This will be the prompt loaded in from the database. ";

    const [prompt, setPrompt] = useState('')
    const [lastID, setLastID] = useState(null)
    const URL = "/api/entry/";
    const navigate = useNavigate();

    useEffect(()=>{
        try{
	        fetch('/api/latestID').then(res=>{
			    if (!res.ok){
					throw new Error ('Network response was not ok');
				}
				return res.json();
			}).then(d=>{
				console.log("ID received from database is " + d);
                setLastID(d)
			});
	   }
	   catch(error) {
			console.error('Error data:', error)
	   }},[])

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("prompt is being altered, the ID is: " + lastID)
                const response = await fetch(`${URL}${lastID}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                //console.log(data);
                setPrompt(data.body);
            } catch (error) {
                console.error('Error fetching prompt:', error);
                setPrompt("This will be the prompt loaded in from the database.");
            }
        };
        fetchData();
    },[lastID]);

    const handlePushPrompt = async () => {
        let UserInput = document.getElementById("InputField").value
        let reply = null
        if (lastID == null) {
            reply = {body: UserInput, parent_ID: null, entry_ID: 0}
        }
        else {
            reply = {body: UserInput, parent_ID: lastID, entry_ID: lastID + 1}
        }

        console.log("this is the data being sent over: " + JSON.stringify(reply))
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reply)
            })
            if (!response.ok) {
                throw new Error(response.status)
            }

            if (lastID == null) {
                setLastID(0)
            }
            else{
                setLastID((prevLastID) =>{
                const newLastID=prevLastID+1;
                return newLastID});
            }
            console.log("this is the current lastID: " + lastID)
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
            <NavBar dispGarlicImage={navBarData.dispGarlicImage} PageName={navBarData.PageName} />
            <ShowPrompt dispPrompt={promptData.dispPrompt} dispPhoneImage={promptData.dispPhoneImage} dispGarlicImage={promptData.dispGarlicImage} />

            <Card style={{ width: '0rem' }}>
                <Card.Body>
                    <input className="InputFieldPrompt" id="InputField" type="text"></input>

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
