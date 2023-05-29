import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from 'react-bootstrap/NavDropdown';

const NavbarTop = function () {
  return (
    <Navbar bg="light" expand="md">
      <Container className="px-1 py-0">
        <Navbar.Brand href="http://localhost:3000/" className="ms-2">
          Geo-Dashboard
        </Navbar.Brand>
        {/* <div className='me-auto' style={{width:'auto'}}></div> */}

        <span className="d-flex">
          {/* <Nav.Link href="#MainDashboard" className="px-4 d-flex">
            Home
          </Nav.Link> */}
          <Nav.Link
            href="http://localhost:8084/openlayers_app"
            className="px-4 btn-secondary"
          >
            Map
          </Nav.Link>
          <Nav.Link href="/upload" className="px-4 btn-secondary">
            Upload shp
          </Nav.Link>
          {/* <Nav.Link href="/charts" className="px-4 btn-secondary">
            Charts
          </Nav.Link> */}
        </span>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav">Extra</Navbar.Toggle> */}
        {/* <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='me-auto'>
                    <Nav.Link href='#MainDashboard'>Home</Nav.Link>
                    <Nav.Link href='#'>Map</Nav.Link>
                </Nav>
            </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
};

export default NavbarTop;
