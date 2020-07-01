import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'

const Application = (props) => {
  const [createdId, setCreatedId] = useState(null)
  const [application, setApplication] = useState({
    name: '',
    story: '',
    email: '',
    phone: ''
  })

  const handleChange = event => {
    // event.persist() let the event can be used in callback function asyn
    const updatedField = { [event.target.name]: event.target.value }
    // {} made a copy of movie
    const editedApplication = Object.assign({}, application, updatedField)

    setApplication(editedApplication)
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/applications`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { application }
    })
      .then(res => {
        setCreatedId(res.data.result._id)
      })
      .then(() => props.msgAlert({
        heading: 'Success',
        message: 'Create Application Successfully!',
        variant: 'success'
      }))
      .catch(error => {
        props.msgAlert({
          heading: 'Fail' + error.message,
          message: 'Create Application Failed',
          variant: 'danger'
        })
      })
  }

  if (createdId) {
    return <Redirect to={'/'} />
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Your Name</Form.Label>
          <Form.Control type="text" placeholder="Your Name" value={application.name} name="name" onChange={handleChange}/>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Your Backgroud</Form.Label>
          <Form.Control type="text" placeholder="Your Story" value={application.story} name="story" onChange={handleChange}/>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={application.email} name="email" onChange={handleChange}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="number" placeholder="Phone Number" value={application.phone} name="phone" onChange={handleChange}/>
          <Form.Text className="text-muted">
            We never share your phone number with anyone else.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Application
