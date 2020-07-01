import apiUrl from '../apiConfig'
import axios from 'axios'

export const emptyCart = user => {
  return axios({
    url: `${apiUrl}/delete-cart`,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const getCourse = user => {
  return axios({
    url: `${apiUrl}/my-course`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const createCart = user => {
  return axios({
    url: apiUrl + '/shopping-cart',
    method: 'PATCH',
    data: {
      'shoppingCart': {
        'courses': [],
        'user': `${user._id}`,
        'totalCost': 0,
        'stripeId': null
      }
    },
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const getCart = user => {
  return axios({
    url: `${apiUrl}/shopping-cart`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
export const putToCart = (data, user) => {
  return axios({
    url: apiUrl + '/shoppingcart',
    method: 'PATCH',
    data: data,
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
