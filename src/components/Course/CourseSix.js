import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { putToCart } from '../../api/cart'

const CourseSix = (props) => {
  const addToCart = (event) => {
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/add-course`,
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: {
        imageUrl: 'https://ga-core.s3.amazonaws.com/production/uploads/program/default_image/669/thumb_PartTime_DigitalMarketing.jpg',
        title: 'Digital Marketing',
        price: 123
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
      <div className="course1">
        <h2 className="head">Digital Marketing</h2>
        <p className="ptag">Your best course for career transformation. This full-time data science bootcamp features expert instruction, one-on-one career coaching, and connections to top employers to get you hired.

        This course is also offered in a Remote format.</p>
      </div>
      <h4 className="subtitle">With 11K+ hires, we’ve placed more grads in high-growth, high-pay tech careers than any other program in the world.</h4>
      <h5>Learn Universal Skills to Solve Complex User Problems</h5>
      <p>
      Launch a future-proof career designing digital experiences that power revenue, user loyalty, and product success.
      </p>
      <h5>Build a Professional-Grade Portfolio</h5>
      <p>
      Distinguish yourself as a designer, compiling a portfolio to showcase solo, group, and client projects to employers.
      </p>
      {props.user && <Button onClick={addToCart} >Add To Cart</Button>}
      {props.user && <Link to={'/applications'}><Button className="moveRight">Apply</Button></Link>}
    </div>
  )
}

export default withRouter(CourseSix)
