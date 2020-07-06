import React, { useEffect, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { getDisplay } from '../../api/display'
import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card'

const SearchCourse = (props) => {
  const [result, setResult] = useState([])
  useEffect(() => {
    getDisplay()
      .then(res => {
        const allResult = res.data.carts
        const result = allResult.filter((ele) => ele.title.toLowerCase().includes(props.search.toLowerCase()))
        return result
      })
      .then((res) => {
        setResult(res)
      })
  }, [])
  if (!result) {
    return <p>Sorry we don not have what you want</p>
  }
  if (result) {
    return (
      <div>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://toddsharon.s3.amazonaws.com/3a28470af7874aec0b5033f1a129fa65"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://toddsharon.s3.amazonaws.com/b02afe0de7c64091f3635611ba570def"
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://toddsharon.s3.amazonaws.com/e4e968f1d949e7ff92db527635d64161"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
        <div className="cardcontainer">
          {result.map((course, index) => (
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

export default withRouter(SearchCourse)
