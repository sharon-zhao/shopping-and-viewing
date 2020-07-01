import React from 'react'
// import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'

const stripePromise = loadStripe('pk_test_51GwtbWItoru9tJqqxGjpCu9YnOadmUXoLHvccDJAfmW00XwTKz3GCNqumtCC7rZC3R3VxtGdEne6M1ypGG2kxbN100QM59yfj2')

const CheckoutForm = ({ success }) => {
  const stripe = useStripe()
  const elements = useElements()
  const handleSubmit = (event) => {
    event.preventDefault()
    const { error, paymentMethod } = await stripe.createPaymentMehtod({
      type: 'card',
      card: elements.getElement(CardElement)
    })
    if (!error) {
      const { id } = paymentMethod

      try {
        const { data } = await axios.post('../../api/charge', { id, amount: 1099 })
        console.log(data)
        success()
      } catch (error) {
        error.message
      }
    }
  }
  return <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 0 }}>
    <h2>price:$</h2>
    <CardElement />
    <Button type="submit" disabled={!stripe}>
      pay
    </Button>
  </form>
}

const StripeCheckoutForm = () => {
  const [status, setStatus] = React.useStatus('ready')
  if (status === 'success') {
    return <div>congrats on your payment</div>
  }
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm success={() => {
          setStatus('success')
        }} />
    </Elements>
  )
}
export default StripeCheckoutForm
