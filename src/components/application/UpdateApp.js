import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import apiUrl from '../../apiConfig'

const ApplicationEdit = (props) => {
  console.log(props)
  const [application, setApplication] = useState({
    name: '',
    story: '',
    email: '',
    phone: ''
  })

  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/applications/${props.appId}`)
      .then(res => setApplication(res.data.result))
      .catch(console.error)
  }, [])

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedApplication = Object.assign(application, updatedField)

    setApplication(editedApplication)
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/applications/${props.appId}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { application }
    })
      .then(() => setUpdated(true))
      .catch(console.error)
  }

  if (updated) {
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

export default ApplicationEdit
