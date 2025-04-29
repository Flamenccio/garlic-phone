import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import '../App.css'
import Button from 'react-bootstrap/Button';
import TypeWriterButton from '../assets/Type-Writer-Button.png'
import GarlicImage from '../assets/Garlic-image.png';
import PhoneImage from '../assets/Phone-image.png';

function OutputPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { userInput } = location.state || {};

    const server = 'http://localhost:5000'

    const [data, setData] = useState([]);

    useEffect(() =>{
       try{
	        fetch(server + '/api/results/3').then(res=>{
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
	   }
    }, []);

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
    );
}

export default OutputPage; 