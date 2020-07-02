import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { putToCart } from '../../api/cart'

const CourseThree = (props) => {
  const addToCart = (event) => {
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/add-course`,
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: {
        imageUrl: 'https://ga-core.s3.amazonaws.com/production/uploads/program/default_image/9192/thumb_101_Intro_ProductManagement.jpg',
        title: 'Product Management Course: Boston',
        price: 98
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
        <h2 className="head">Product Management Course: Boston</h2>
        <p className="ptag">Balance business viability, technical feasibility, and customer desire to lead products and features toward long-term success. Learn from a seasoned expert.</p>
      </div>
      <h4 className="subtitle">LinkedIn ranks product manager as one of the most promising jobs, with 29% year-over-year growth in the United States alone.</h4>
      <h5>Get the Skills Today’s Employers Demand</h5>
      <p>
      Formalize your product management (PM) skill set to succeed across both startup and enterprise product organizations. Gain the confidence and credibility you need to lead cross-functional initiatives and bring physical and digital products to life.
      </p>
      <h5>Let Your Employer Foot the Bill</h5>
      <p>
      More than 45% of our part-time students receive tuition reimbursement from their companies — you could, too. We can send you an employer sponsorship package to show your manager the advantages of learning with GA.
      </p>
      {props.user && <Button onClick={addToCart} >Add To Cart</Button>}
      {props.user && <Link to={'/applications'}><Button className="moveRight">Apply</Button></Link>}
    </div>
  )
}

export default withRouter(CourseThree)
