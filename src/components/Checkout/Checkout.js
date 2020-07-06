import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getCart } from '../../api/cart'
import Modal from 'react-bootstrap/Modal'
import { withRouter, Link } from 'react-router-dom'
import { combineObj } from '../../lib/combineobj'
import { removeDuplicate } from '../../lib/removeduplicate'
import Card from 'react-bootstrap/Card'
// import Card from 'react-bootstrap/Card'
// import Accordion from 'react-bootstrap/Accordion'
// import StripeCheckoutForm from './CheckoutForm'

const Checkout = (props) => {
  const [carts, setCarts] = useState({
    products: {},
    totalCost: 0
  })
  // const totalCost = () => {
  //   let sum = 0
  //   props.buyHistory.forEach(cart => {
  //     sum = sum + cart.price
  //   })
  //   return sum
  // }
  // props.setBuyHistory(response)
  const cartObj = carts.products
  const onlyTitle = Object.keys(cartObj)

  const moveToHistory = event => {
    event.preventDefault()
    getCart(props.user)
      .then(res => {
        const midCart = {
          products: {},
          totalCost: 0
        }
        const resObj = res.data.shoppingCart[0]
        const resArr = res.data.shoppingCart[0].courses
        midCart.totalCost = resObj.totalCost
        const result = combineObj(resArr)
        midCart.products = result
        setCarts(midCart)
        return res
      })
      .then(res => {
        const resArr = res.data.shoppingCart[0].courses
        props.setBuyHistory(resArr)
      })
  }

  const singleArr = () => {
    const emptyArr = []
    if (onlyTitle) {
      if (props.buyHistory) {
        const newObj = removeDuplicate(props.buyHistory)
        for (let i = 0; i < onlyTitle.length; i++) {
          const eachTitle = onlyTitle[i]
          const resultObj = newObj[eachTitle]
          emptyArr.push(resultObj)
        }
      }
    }
    return emptyArr
  }
  const quantity = () => {
    const emptyArr = []
    const arr = singleArr()
    if (arr[0] !== undefined) {
      for (let i = 0; i < arr.length; i++) {
        const name = arr[i].title
        const number = carts.products[name]
        emptyArr.push(number)
      }
    }
    return emptyArr
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
  if (!carts) {
    return <p>Loading....</p>
  }

  if (props.buyHistory.length === 0) {
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
        </Form>
      </div>
    )
  }
  if (props.buyHistory[0] !== undefined) {
    return (
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Products You Purchase Total Cost: ${carts.totalCost}</Modal.Title>
          </Modal.Header>
          {singleArr().map((course, index) => (
            <div key={course._id}>
              <Card className="postBox">
                <div className="borderBox"></div>
                <Card.Body className="cartContent">
                  <div className="textBox">
                    <p className="postInfo">Added on {course.createdAt ? course.createdAt.split('T')[0] : 'DATE'}</p>
                  </div>
                  <img variant="top" src={course.imageUrl} />
                  <div>
                    <div className="postTextTitle">
                      Course Name: {course.title}
                    </div>
                    <div className="postTextBody">
                      Course Price: ${course.price}
                    </div>
                    <div className="postTextBody">
                       Quantity: {quantity()[index]}
                    </div>
                    <div className="postTextBody">
                       Total Cost: {quantity()[index] * course.price}
                    </div>
                  </div>
                </Card.Body>
              </Card>
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
      </div>
    )
  }
}

export default withRouter(Checkout)
