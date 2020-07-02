import React, { Fragment } from 'react'
import { Nav, Navbar, Button, Dropdown, ButtonGroup, Form, FormControl } from 'react-bootstrap'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#shopping-cart">My Cart</Nav.Link>
    <Dropdown as={ButtonGroup}>
      <Button variant="success">User Action</Button>
      <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
      <Dropdown.Menu>
        <Dropdown.Item href="#allapplications">My Application</Dropdown.Item>
        <Dropdown.Item href="#change-password">Change Password</Dropdown.Item>
        <Dropdown.Item href="#sign-out">Sign Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
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
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <img className="Logo" src='' alt="Logo"/>
    <Nav className="mr-auto">
      { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
      { alwaysOptions }
      { user ? authenticatedOptions : unauthenticatedOptions }
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>
)

export default Header
