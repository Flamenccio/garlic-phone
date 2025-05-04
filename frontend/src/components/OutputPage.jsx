import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import '../App.css'
import Button from 'react-bootstrap/Button';
import TypeWriterButton from '../assets/Type-Writer-Button.png'
import GarlicImage from '../assets/Garlic-image.png';
import PhoneImage from '../assets/Phone-image.png';
import NavBar from './NavBar'

function OutputPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { userInput } = location.state || {};

    const URL = '/api/results/'

    const [data, setData] = useState([]);
    const [ID, setID] = useState(null)

    useEffect(()=>{
        if (ID == null) {
            try{
	            fetch('/api/latestID').then(res=>{
			        if (!res.ok){
					    throw new Error ('Network response was not ok');
				    }
				    return res.json();
			    }).then(d=>{
				    console.log("ID received from database is " + d);
                    setID(d)
			    });
	        }
	        catch(error) {
			    console.error('Error data:', error)
	        }
        }
    },[])

    useEffect(() =>{
       try{
	        fetch(`${URL}${ID}`).then(res=>{
			    if (!res.ok){
					throw new Error ('Network response was not ok');
				}
				return res.json();
			}).then(d=>{
				console.log(d);
                setData(d)
			});
	   }
	   catch(error) {
			console.error('Error data:', error)
            setData['please wait']
	   }
    }, [ID]);

    const navBarData = {
        PageName: "Output Page",
        dispGarlicImage: GarlicImage,
    }

    return (
        <div>
            <NavBar dispGarlicImage={navBarData.dispGarlicImage} PageName={navBarData.PageName} />
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

                        <Card.Title className="Title">Final Story</Card.Title>

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
                        <ol>
                            {data.slice().reverse().map((item, index) => (<li key={index}>{item}</li>))}
                        </ol>
                    </Card.Text>

                    <div className="custom-buttons">
                        <Button variant="secondary"
                            onClick={() => navigate(-1)}
                            className="image-button"
                            style={{
                                backgroundImage: `url(${TypeWriterButton})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >Back
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default OutputPage; 