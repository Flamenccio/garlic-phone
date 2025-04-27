import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

function BasicCard() {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Form.Control size="sm" type="text" placeholder="Input here" />
                <br></br>
                <Button variant="primary">Submit</Button>
            </Card.Body>
        </Card>
    );
}

export default BasicCard;