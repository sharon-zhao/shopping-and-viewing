import apiUrl from '../apiConfig'
import axios from 'axios'

export const payCourse = (amount, id) => {
  return axios({
    url: apiUrl + 'pay-course',
    method: 'POST',
    data: {
      'charge': {
        'amount': amount,
        'payment_id': id
      }
    }
  })
}
