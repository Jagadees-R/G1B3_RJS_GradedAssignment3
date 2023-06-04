import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClapperboard } from '@fortawesome/free-solid-svg-icons';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavigationMenu = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand to={"/"} as={NavLink} className={"me-4"}>
            <span style={{ fontSize: '2.5rem', color: 'goldenrod' }} >
              <FontAwesomeIcon icon={faClapperboard} style={{color: "#fbff00",}} />
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto fs-5">
              <Nav.Link to={"/"} as={NavLink}><span style={{color: 'red'}}>Home</span></Nav.Link>
              <Nav.Link to={"/movies-in-theaters"} as={NavLink}><span style={{color: 'red'}}>Movies in theaters</span></Nav.Link>
              <Nav.Link to={"/movies-coming"} as={NavLink}><span style={{color: 'red'}}>Coming Soon</span></Nav.Link>
              <Nav.Link to={"/top-rated-india"} as={NavLink}><span style={{color: 'red'}}>Top Rated Indian</span></Nav.Link>
              <Nav.Link to={"/top-rated-movies"} as={NavLink}><span style={{color: 'red'}}>Top Rated Movies</span></Nav.Link>
              <Nav.Link to={"/favourite"} as={NavLink}><span style={{color: 'red'}}>Favourites</span></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
};

export default NavigationMenu;
