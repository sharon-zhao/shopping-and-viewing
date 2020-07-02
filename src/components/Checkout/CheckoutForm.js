import React, { useState } from 'react'
import { createCardToken, addCardToken, sendCharge } from '../../api/stripe'
import { Link, withRouter } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { emptyCart } from '../../api/cart'
// import Card from 'react-bootstrap/Card'

const StripeCheckoutForm = ({ buyHistory, msgAlert, user, customer, history }) => {
  const [show, setShow] = useState(false)
  const [number, setNumber] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [cvc, setCvc] = useState('')
  // const [redirect, setRedirect] = useState(false)
  // const [cardToken, setCardToken] = useState('')
  console.log(buyHistory)
  const totalCost = () => {
    let sum = 0
    buyHistory.forEach(cart => {
      sum = sum + cart.price
    })
    return sum
  }
  const handleChangeNumber = event => {
    setNumber(event.target.value)
  }
  const handleChangeMonth = event => {
    setMonth(event.target.value)
  }
  const handleChangeYear = event => {
    setYear(event.target.value)
  }
  const handleChangeCvc = event => {
    setCvc(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    createCardToken(number, month, year, cvc)
      .then(data => {
        const token = data.data.card.id
        return token
      })
      .then(token => {
        addCardToken(token, customer)
      })
      .then(() => handleShow())
      .catch(() => {
        msgAlert({
          heading: 'Failed',
          message: 'Fail To Make a Payment',
          variant: 'danger'
        })
      })
  }

  const handlePurchaseCompletion = (event) => {
    event.preventDefault()
    const setnum = totalCost()
    const number = setnum * 100
    sendCharge(number, customer)
      .then(() => {
        emptyCart(user)
      })
      .then(() => msgAlert({
        heading: 'Payment Success',
        message: 'Successfully Pay Your Course',
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(() => msgAlert({ heading: 'Failed', message: 'Failed To Your Course', variant: 'danger' }))
  }
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="title">Thanks For Your Purchase</Modal.Title>
          <Modal.Title className="title">Total Cost: ${totalCost()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>You Buy {buyHistory.length} Products</Modal.Body>
        {buyHistory.map(ele => (
          <div key={ele._id}>
            <Modal.Body>Course Name: {ele.title}</Modal.Body>
            <Modal.Body>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</Modal.Body>
          </div>
        ))}
        <Modal.Body>Prepare For Learning</Modal.Body>
        <Modal.Footer>
          <Link to={'/'} ><Button onClick={handlePurchaseCompletion}>
            Confirm To Pay
          </Button></Link>
        </Modal.Footer>
      </Modal>
      <Form onSubmit={handleSubmit} className="container">
        <h3>Total Cost: ${totalCost()}</h3>
        <div>
          <Form.Group className="col-12 formText row">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              required
              className="creditForm"
              type="text"
              name="number"
              value={number}
              maxLength="16"
              placeholder="0000-0000-0000-0000"
              onChange={handleChangeNumber}
            />
          </Form.Group>
          <Form.Group className="row formText">
            <div className="col-3">
              <Form.Label>Month</Form.Label>
              <Form.Control
                required
                className="creditForm"
                name="month"
                value={month}
                maxLength="2"
                type="text"
                placeholder="00"
                onChange={handleChangeMonth}
              />
            </div>
            <div className="col-3">
              <Form.Label>Year</Form.Label>
              <Form.Control
                required
                className="creditForm"
                name="year"
                value={year}
                type="text"
                maxLength="4"
                placeholder="0000"
                onChange={handleChangeYear}
              />
            </div>
            <div className="col-3 formDiv">
              <Form.Label>Cvc Number</Form.Label>
              <Form.Control
                className="creditForm"
                required
                name="cvc"
                value={cvc}
                type="text"
                maxLength="4"
                placeholder="000"
                onChange={handleChangeCvc}
              />
            </div>
          </Form.Group>
        </div>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </div>
  )
}
// else {
//   return (
//     <Redirect to='/products' />
//   )
// }

export default withRouter(StripeCheckoutForm)
