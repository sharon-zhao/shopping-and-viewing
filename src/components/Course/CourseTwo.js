import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { putToCart } from '../../api/cart'

const CourseTwo = (props) => {
  const addToCart = (event) => {
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/add-course`,
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: {
        imageUrl: 'https://ga-core.s3.amazonaws.com/production/uploads/program/default_image/11342/thumb_FullTime_SoftwareEngineeringImmersive.jpg',
        title: 'Software Engineering Immersive: Boston',
        price: 1980
      }
    })
      .then(res => {
        putToCart(res, props.user)
      })
      .then(() => props.msgAlert({
        heading: 'Success',
        message: 'Add to Cart successfully!',
        variant: 'success'
      }))
      .catch(error => {
        props.msgAlert({
          heading: 'Fail' + error.message,
          message: 'Add to Cart Failed',
          variant: 'danger'
        })
      })
  }
  return (
    <div>
      <div className="course2">
        <h2 className="head">Software Engineering Immersive: Boston</h2>
        <p className="ptag">Your best course for career transformation in tech. This full-time coding bootcamp features expert instruction, one-on-one career coaching, and connections to top employers to get you hired.

        This course is also offered in remote and part-time formats.</p>
      </div>
      <h4 className="subtitle">With 12K+ hires, we’ve placed more grads in high-growth, high-pay tech careers than any other coding bootcamp.</h4>
      <h5>Launch a Fulfilling, Future-Proof Career</h5>
      <p>
      Become indispensable in our tech-driven world. Meet the global demand for problem-solvers with strong technical foundations and the agility to keep learning.
      </p>
      <h5>Build a Professional-Grade Portfolio</h5>
      <p>
      Showcase your coding and collaboration skills to potential employers, creating full-stack web applications that leverage modern programming languages, frameworks, and tools.
      </p>
      {props.user && <Button onClick={addToCart} >Add To Cart</Button>}
      {props.user && <Link to={'/applications'}><Button className="moveRight">Apply</Button></Link>}
    </div>
  )
}

export default withRouter(CourseTwo)
