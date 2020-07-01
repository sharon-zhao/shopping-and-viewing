import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import './postIndexShow.scss'

const MyCart = (props) => {
  const [carts, setCarts] = useState([])

  const totalCost = () => {
    let sum = 0
    carts.forEach(cart => {
      sum = sum + cart.price
    })
    return sum
  }

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/my-course`,
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => {
        const resdata = res.data.carts
        return resdata.filter(cart => cart.owner._id === props.user._id)
      })
      .then(response => {
        setCarts(response)
        if (carts) {
          totalCost()
        }
      })
      // .catch(console.error)
  }, [])

  const deleteCourse = (event, cart) => {
    event.preventDefault()
    axios({
      method: 'DELETE',
      url: `${apiUrl}/my-course/${cart.id}`,
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => {
        return axios({
          method: 'GET',
          url: `${apiUrl}/my-course`,
          headers: {
            'Authorization': `Token token=${props.user.token}`
          }
        })
      })
      .then(res => {
        const resdata = res.data.carts
        return resdata.filter(cart => cart.owner._id === props.user._id)
      })
      .then(response => {
        setCarts(response)
        if (carts) {
          totalCost()
        }
      })
  }

  if (!carts) {
    return <p>Loading....</p>
  }

  if (carts.length === 0) {
    return <p>There are no courses yet!!! Add one!</p>
  }

  // console.log('posts: ', posts)
  return (
    <div>
      <div className="cartIndexContainer">
        {carts.map(cart => (
          <Card key={cart._id} className="postBox">
            <div className="borderBox"></div>
            <Card.Body className="cartContent">
              <div className="textBox">
                <p className="postInfo">Added on {cart.createdAt ? cart.createdAt.split('T')[0] : 'DATE'}</p>
              </div>
              <div>
                <div className="postTextTitle">
                  Course Name: {cart.title}
                </div>
                <div className="postTextBody">
                  Course Price: ${cart.price}
                </div>
                <Button onClick={() => deleteCourse(event, cart)} className="button">delete</Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
      <p>Total Cost: ${totalCost()}</p>
      <div className="buttonBox">
        <Link to={'/checkout'}><Button className="moveRight">Check Out</Button></Link>
      </div>
    </div>
  )
}

export default MyCart
