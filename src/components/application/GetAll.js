import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'

const ApplicationIndex = (props) => {
  const [applications, setApplications] = useState(null)
  const [show, setShow] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [appl, setAppl] = useState({
    name: '',
    story: '',
    email: '',
    phone: ''
  })

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/applications`,
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => {
        const resdata = res.data.results
        return resdata.filter(result => result.owner === props.user._id)
      })
      .then(response => {
        // console.log(res.data.posts)
        setApplications(response)
      })
      // .catch(console.error)
  }, [])

  if (!applications) {
    return <p>Loading....</p>
  }

  if (applications.length === 0) {
    return <p>There are no posts yet!!! Make one!</p>
  }

  const deleteApplication = (event, application) => {
    event.preventDefault()
    axios({
      method: 'DELETE',
      url: `${apiUrl}/applications/${application.id}`,
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => {
        return axios({
          method: 'GET',
          url: `${apiUrl}/applications`,
          headers: {
            'Authorization': `Token token=${props.user.token}`
          }
        })
      })
      .then()
  }

  const handleChange = event => {
    event.persist()
    const updatedField = { [event.target.name]: event.target.value }

    const editedApplication = Object.assign({}, appl, updatedField)
    setAppl(editedApplication)
  }

  const handleSubmit = (event, application) => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/applications/${application.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { appl }
    })
      .then(() => setUpdated(true))
      .catch(console.error)
  }

  if (updated) {
    return <Redirect to={'/'} />
  }

  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
    return <Redirect to={{ pathname: '/' }} />
  }

  return (
    <div>
      <div>
        {applications.map(application => (
          <Card key={application._id} className="postBox">
            <div className="borderBox"></div>
            <Card.Body className="postContent">
              <div className="textBox">
                <p className="postInfo">{application.owner ? application.owner.email : 'USERNAME'}</p>
                <p className="postInfo">Applicationed on {application.createdAt ? application.createdAt.split('T')[0] : 'DATE'}</p>
              </div>
              <div>
                <div className="postTextTitle">
                  Story: {application.story}
                </div>
              </div>
              <Button variant="primary" onClick={handleShow}>
                Update
              </Button>
              <Button onClick={() => deleteApplication(event, application)} className="button">Delete</Button>
            </Card.Body>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={() => handleSubmit(event, application)}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control type="text" placeholder="Your Name" value={appl.name} name="name" onChange={handleChange}/>
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Your Backgroud</Form.Label>
                    <Form.Control type="text" placeholder="Your Story" value={appl.story} name="story" onChange={handleChange}/>
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={appl.email} name="email" onChange={handleChange}/>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="number" placeholder="Phone Number" value={appl.phone} name="phone" onChange={handleChange}/>
                    <Form.Text className="text-muted">
                      We never share your phone number with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ApplicationIndex
