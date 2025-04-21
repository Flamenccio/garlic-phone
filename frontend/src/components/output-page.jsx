import { useLocation } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

function OutputPage() {
    const location = useLocation();
    const {userInput} = location.state || {}; 

    return(
        <Card style = {{width: '0rem'}}>
            <Card.Body>
                <Card.Title className="Title">Output</Card.Title>
                <Card.Text className="Text">
                    {userInput || 'No responses given yet. Try answering the prompt!'}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default OutputPage; 