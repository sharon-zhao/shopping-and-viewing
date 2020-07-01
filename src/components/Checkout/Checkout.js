import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getCourse } from '../../api/cart'
import Modal from 'react-bootstrap/Modal'
import { withRouter, Link } from 'react-router-dom'
// import Card from 'react-bootstrap/Card'
// import Accordion from 'react-bootstrap/Accordion'
// import StripeCheckoutForm from './CheckoutForm'

const Checkout = (props) => {
  const totalCost = () => {
    let sum = 0
    props.buyHistory.forEach(cart => {
      sum = sum + cart.price
    })
    return sum
  }
  // const [buyHistory, setBuyHistory] = useState([])
  const moveToHistory = event => {
    event.preventDefault()
    getCourse(props.user)
      .then(res => {
        const resdata = res.data.carts
        return resdata.filter(cart => cart.owner._id === props.user._id)
      })
      .then(response => {
        props.setBuyHistory(response)
      })
  }
  // if (buyHistory.length > 0) {
  //   return <Redirect to={{
  //     pathname: '/payment',
  //     state: { buyHistory: buyHistory },
  //     user: { user: props.user },
  //     msgAlert: { msgAlert: props.msgAlert }
  //   }} />
  // }
  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => {
    setShow(true)
  }
  return (
    <div>
      <Form onSubmit={moveToHistory}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="name" />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="address" />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="city" />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>State</Form.Label>
          <Form.Control as="select">
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control type="text" placeholder="zip code" />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="number" placeholder="000-000-0000"/>
        </Form.Group>
        {/* <Button type="submit" className="moveRight">Submit</Button> */}
        <Button type="submit" variant="primary" onClick={handleShow}>
          Submit
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Products You Purchase Total Cost: ${totalCost()}</Modal.Title>
          </Modal.Header>
          {props.buyHistory.map(ele => (
            <div key={ele._id}>
              <Modal.Body>Course Name: {ele.title}</Modal.Body>
              <Modal.Body>Course Price: ${ele.price}</Modal.Body>
            </div>
          ))}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {/* <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button> */}
            <Link to={'/payment'}><Button onClick={handleClose} className="moveRight">Save</Button></Link>
          </Modal.Footer>
        </Modal>
      </Form>
    </div>
  )
}

export default withRouter(Checkout)
