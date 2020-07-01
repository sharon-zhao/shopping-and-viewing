import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from '../../apiConfig'

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
        imageUrl: 'https://ga-core.s3.amazonaws.com/production/uploads/program/default_image/13832/thumb_Business_Make_Heart_Hand_Tray_Suit.jpg',
        title: 'Visual Design Course: Boston',
        price: 3888
      }
    })
      .then(res => {
        return res
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
      <div className="course4">
        <h2 className="head">Visual Design Course: Boston</h2>
        <p className="ptag">Gain the vocabulary and tools to tackle diverse design challenges on the job. Kickstart your portfolio and create beautiful, responsive designs for the web.</p>
      </div>
      <h4 className="subtitle">Over half of jobs in tech and IT now require digital design skills — as well as 815,000 open roles in other industries.</h4>
      <h5>Boost Your Professional Value With Versatile Skills</h5>
      <p>
      More than pushing pixels, design is a superpower for many careers and is core to the success of many companies. Strong visual communication is critical, whether you’re creating a digital product, a presentation, or an ad campaign.
      </p>
      <h5>Let Your Employer Foot the Billo</h5>
      <p>
      More than 45% of our part-time students receive tuition reimbursement from their companies — you could, too. We can send you an employer sponsorship package to show your manager the advantages of learning with GA.
      </p>
      {props.user && <Button onClick={addToCart} >Add To Cart</Button>}
      {props.user && <Link to={'/applications'}><Button className="moveRight">Apply</Button></Link>}
    </div>
  )
}

export default withRouter(CourseTwo)
