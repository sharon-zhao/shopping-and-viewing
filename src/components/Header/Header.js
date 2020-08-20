import React, { Fragment } from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#shopping-cart">My Cart</Nav.Link>
    <NavDropdown title="User Action" id="basic-nav-dropdown">
      <NavDropdown.Item href="#allapplications">My Application</NavDropdown.Item>
      <NavDropdown.Item href="hange-password">Change Password</NavDropdown.Item>
      <NavDropdown.Item href="#sign-out">Sign Out</NavDropdown.Item>
      <NavDropdown.Divider />
    </NavDropdown>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link href="#/">Home</Nav.Link>
    <Nav.Link href="#/mapindex">Campus</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">ST</Navbar.Brand>
    <img className="Logo" src='https://express-upload.s3.amazonaws.com/006ffc056a606299fb617b4533678681' alt="Logo"/>
    <Nav className="mr-auto">
      { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
      { alwaysOptions }
      { user ? authenticatedOptions : unauthenticatedOptions }
    </Nav>
  </Navbar>
)

export default Header
