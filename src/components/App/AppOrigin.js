import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import CourseIndex from '../Products/CourseIndex'
import CourseOne from '../Course/CourseOne'
import CourseTwo from '../Course/CourseTwo'
import CourseThree from '../Course/CourseThree'
import CourseFour from '../Course/CourseFour'
import CourseFive from '../Course/CourseFive'
import CourseSix from '../Course/CourseSix'
import MyCart from '../Cart/MyCart'
import Checkout from '../Checkout/Checkout'
import StripeCheckoutForm from '../Checkout/CheckoutForm'
import Application from '../application/Application'
import ApplicationEdit from '../application/UpdateApp'
import ApplicationIndex from '../application/GetAll'
// import OneApplication from '../application/GetOne'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: [],
      customer: null
    }
  }

  setUser = user => this.setState({ user })
  setCustomer = () => this.setState()

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} customer={this.state.customer} setCustomer={this.setCustomer} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} customer={this.state.customer} setCustomer={this.setCustomer} />
          )} />
          <Route exact path='/' component={CourseIndex} />
          <Route exact path='/courseone' render={() => (
            <CourseOne msgAlert={this.msgAlert} user={user}/>
          )} />
          <Route exact path='/coursetwo' render={() => (
            <CourseTwo msgAlert={this.msgAlert} user={user}/>
          )} />
          <Route exact path='/coursethree' render={() => (
            <CourseThree msgAlert={this.msgAlert} user={user}/>
          )} />
          <Route exact path='/coursefour' render={() => (
            <CourseFour msgAlert={this.msgAlert} user={user}/>
          )} />
          <Route exact path='/coursefive' render={() => (
            <CourseFive msgAlert={this.msgAlert} user={user}/>
          )} />
          <Route exact path='/coursesix' render={() => (
            <CourseSix msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute exact path='/shopping-cart' user={user} render={() => (
            <MyCart msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute path='/checkout' user={user} render={() => (
            <Checkout msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} customer={this.state.customer} setCustomer={this.setCustomer} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute path='/allapplications' user={user} render={() => (
            <ApplicationIndex msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute path='/applications' user={user} render={() => (
            <Application msgAlert={this.msgAlert} user={user}/>
          )} />
          {/* <AuthenticatedRoute path='/applications/:id' user={user} render={({ match }) => (
              const appId = match.params.id
              return (
                <OneApplication addId={ appId } msgAlert={msgAlerts} user={user}/>
              )
          )} /> */}
          <AuthenticatedRoute path='/update/:id' user={user} render={({ match }) => (
            <ApplicationEdit msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute exact path='/payment' user={user} render={() => (
            <StripeCheckoutForm msgAlert={msgAlerts} user={user}/>
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
