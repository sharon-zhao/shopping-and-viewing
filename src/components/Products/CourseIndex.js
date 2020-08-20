import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { withRouter, Link, Redirect } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { getDisplay } from '../../api/display'
// import Course1 from '../EachCourse/Course1'

const CourseIndex = (props) => {
  const [redirect, setRedirect] = useState(false)
  useEffect(() => {
    getDisplay()
      .then(res => {
        props.setDisplay(res.data.carts)
      })
  }, [])
  const handleSearchInput = (event) => {
    props.setSearch(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    setRedirect(true)
  }
  if (redirect) {
    return <Redirect to={'/couresesearch'} />
  }

  if (props.display.length === 0) {
    return <p>First loading is about 6 seconds....</p>
  }
  if (props.display) {
    return (
      <div>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://express-upload.s3.amazonaws.com/525312a6d65b42ac0e57cd0562b69219"
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://express-upload.s3.amazonaws.com/2b377d68e397b28aa4122e2efee3e862"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
        <div className="searchContainer">
          <Form onSubmit={handleSearchSubmit}className="searchBar">
            <Form.Control type="text" name="search" placeholder="Search Course" onChange={handleSearchInput} />
            <div className="searchButton"><button style={{ color: 'white' }} type='submit'>Q</button></div>
          </Form>
        </div>
        <div className="cardcontainer">
          {props.display.map((course, index) => (
            <Card key={course._id} style={{ width: '20rem' }} className='card'>
              <Card.Img variant="top" src={course.url} />
              <Card.Body>
                <Card.Title><Link to={course.link}>{course.title}</Link></Card.Title>
                <Card.Text>
                  {course.discreption}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    )
  }
}

export default withRouter(CourseIndex)
