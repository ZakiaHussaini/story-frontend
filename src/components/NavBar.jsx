import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'




const NavBar = () => {
  return (
    <div>
    <Navbar expand="md" fixed='top' >
      <Container>
        <Navbar.Brand >Story Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Nav.Link >
              <i className="fas fa-home"></i>Home
            </Nav.Link>
            <Nav.Link > 
              <i className="fas fa-sign-in-alt"></i>Sign in
            </Nav.Link>
            <Nav.Link > 
              <i className="fas fa-user-plus"></i>Sign up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default NavBar