import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function NavBar(param) {
    return (
        <>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand className="navbar-text-and-image">
                        <span className="navbar-text-1">Garlic Phone</span>
                    </Navbar.Brand>
                    <Navbar.Brand className="navbar-text-and-image" href="/">
                        <span>|</span>
                        <span className="navbar-text-2">Home</span>
                    </Navbar.Brand>
                    <Navbar.Brand className="navbar-text-and-image">
                        <span>|</span>
                        <span className="navbar-text-2" >{param.PageName}</span>
                    </Navbar.Brand>

                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;