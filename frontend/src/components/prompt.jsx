import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

function ShowPrompt(prompt) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>Title</Card.Title>
                <Card.Text>
                    {prompt}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ShowPrompt;