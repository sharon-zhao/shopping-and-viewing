import React, { useEffect, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { getCart } from '../../api/cart'
import { combineObj } from '../../lib/combineobj'
import { removeDuplicate } from '../../lib/removeduplicate'

const MyCart = (props) => {
  const [carts, setCarts] = useState({
    products: {},
    totalCost: 0
  })
  const [courses, setCourses] = useState([])
  // const [single, setSingle] = useState([])
  // const [onlyTitle, setOnlyTitle] = useState(null)
  // const [quantities, setQuantities] = useState([])

  // const totalCost = () => {
  //   let sum = 0
  //   carts.forEach(cart => {
  //     sum = sum + cart.price
  //   })
  //   return sum
  // }
  const cartObj = carts.products
  const onlyTitle = Object.keys(cartObj)
  useEffect(() => {
    getCart(props.user)
      .then(res => {
        const midCart = {
          products: {},
          totalCost: 0
        }
        const resObj = res.data.shoppingCart[0]
        const resArr = res.data.shoppingCart[0].courses
        midCart.totalCost = resObj.totalCost
        const result = combineObj(resArr)
        midCart.products = result
        setCarts(midCart)
        return res
      })
      .then(res => {
        const resArr = res.data.shoppingCart[0].courses
        setCourses(resArr)
      })
  }, [])

  const singleArr = () => {
    const emptyArr = []
    if (onlyTitle) {
      if (courses) {
        const newObj = removeDuplicate(courses)
        for (let i = 0; i < onlyTitle.length; i++) {
          const eachTitle = onlyTitle[i]
          const resultObj = newObj[eachTitle]
          emptyArr.push(resultObj)
        }
      }
    }
    return emptyArr
  }
  const quantity = () => {
    const emptyArr = []
    const arr = singleArr()
    if (arr[0] !== undefined) {
      for (let i = 0; i < arr.length; i++) {
        const name = arr[i].title
        const number = carts.products[name]
        emptyArr.push(number)
      }
    }
    return emptyArr
  }
  const deleteCourse = (event, course) => {
    event.preventDefault()
    axios({
      method: 'DELETE',
      url: `${apiUrl}/my-course/${course.id}`,
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => getCart(props.user))
      .then(res => {
        const midCart = {
          products: {},
          totalCost: 0
        }
        const resObj = res.data.shoppingCart[0]
        const resArr = res.data.shoppingCart[0].courses
        midCart.totalCost = resObj.totalCost
        const result = combineObj(resArr)
        midCart.products = result
        setCarts(midCart)
        return res
      })
      .then(res => {
        const resArr = res.data.shoppingCart[0].courses
        setCourses(resArr)
      })
  }

  // .then(response => {
  //   setCarts(response)
  //   if (carts) {
  //     totalCost()
  //   }
  // })
  // }

  if (!carts) {
    return <p>Loading....</p>
  }

  if (courses.length === 0) {
    return <p>There are no courses yet!!! Add one!</p>
  }
  if (singleArr()) {
    return (
      <div>
        <div className="cartIndexContainer">
          {singleArr().map((course, index) => (
            <Card key={course._id} className="postBox">
              <div className="borderBox"></div>
              <Card.Body className="cartContent">
                <div className="textBox">
                  <p className="postInfo">Added on {course.createdAt ? course.createdAt.split('T')[0] : 'DATE'}</p>
                </div>
                <img variant="top" src={course.imageUrl} />
                <div>
                  <div className="postTextTitle">
                    Course Name: {course.title}
                  </div>
                  <div className="postTextBody">
                    Course Price: ${course.price}
                  </div>
                  <div className="postTextBody">
                     Quantity: {quantity()[index]}
                  </div>
                  <div className="postTextBody">
                     Total Cost: {quantity()[index] * course.price}
                  </div>
                  <Button onClick={() => deleteCourse(event, course)} className="button">delete</Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
        <p>Total Cost: ${carts.totalCost}</p>
        <div className="buttonBox">
          <Link to={'/checkout'}><Button className="moveRight">Check Out</Button></Link>
        </div>
      </div>
    )
  }
}

export default withRouter(MyCart)
