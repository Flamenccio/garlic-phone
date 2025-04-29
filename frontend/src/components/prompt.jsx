import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

function ShowPrompt(param) {
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
                        src={param.dispGarlicImage}
                        alt="Garlic Image"
                        style={{
                            height: '60px',
                            width: 'auto',
                            marginRight: '0'
                        }}
                    />

                    <Card.Title className="Title">Garlic Phone</Card.Title>

                    <img
                        src={param.dispPhoneImage}
                        alt=""
                        style={{
                            height: '60px',
                            width: 'auto',
                            marginLeft: '0'
                        }}
                    />

                </div>
                <Card.Text className="Text">
                    {param.dispPrompt}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ShowPrompt;