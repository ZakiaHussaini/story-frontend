import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';


const NavBar = () => {
  return (
    <div>
    <Navbar expand="md" fixed='top' className={styles.NavBar}>
      <Container>
        <NavLink to='/'>
        <Navbar.Brand className={styles.logo}>Story Blog</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <NavLink to='/' exact className={styles.NavLink} activeClassName={styles.Active} >
              <i className="fas fa-home"></i>Home
            </NavLink>
            <NavLink to='signin'  className={styles.NavLink} activeClassName={styles.Active}> 
              <i className="fas fa-sign-in-alt"></i>Sign in
            </NavLink>
            <NavLink to='signup'  className={styles.NavLink} activeClassName={styles.Active}> 
              <i className="fas fa-user-plus"></i>Sign up
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default NavBar 