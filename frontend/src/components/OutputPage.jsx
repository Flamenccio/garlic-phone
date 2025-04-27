import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function OutputPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const {userInput} = location.state || {}; 

    return(
        <Card style = {{width: '0rem'}}>
            <Card.Body>
                <Card.Title className="Title">Final Story</Card.Title>
                <Card.Text className="Text">
                    This will be loaded from the database.
                </Card.Text>
                <Button variant = "secondary" onClick={() => navigate (-1)} className="mt-3">Back</Button>
            </Card.Body>
        </Card>
    );
}

export default OutputPage; 