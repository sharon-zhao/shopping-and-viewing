import React, { Fragment, useState } from 'react'
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
import MapIndex from '../Map/Map'
import SearchCourse from '../Search/SearchCourse'
import NewYork from '../Place/NewYork'
import Boston from '../Place/Boston'
import Chicago from '../Place/Chicago'
import LosAngeles from '../Place/LA'
import SaltLake from '../Place/Salt'
import Miami from '../Place/Miami'

const App = () => {
  const [user, setUser] = useState(null)
  const [customer, setCustomer] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])
  const [buyHistory, setBuyHistory] = useState([])
  const [search, setSearch] = useState('')
  const [display, setDisplay] = useState([])

  const clearUser = () => setUser(null)

  const msgAlert = ({ heading, message, variant }) => {
    setMsgAlerts([...msgAlerts, { heading, message, variant }])
  }

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
      <main className="container bodyContainer" >
        <Route path='/sign-up' render={() => (
          <SignUp msgAlert={msgAlert} setUser={setUser} setCustomer={setCustomer} />
        )} />
        <Route path='/sign-in' render={() => (
          <SignIn msgAlert={msgAlert} setUser={setUser} setCustomer={setCustomer} />
        )} />
        <Route exact path='/' render={() => (
          <CourseIndex msgAlert={msgAlert} setSearch={setSearch} search={search} setDisplay={setDisplay} display={display} />
        )} />
        <Route exact path='/mapindex' render={() => (
          <MapIndex msgAlert={msgAlert} user={user}/>
        )} />
        <Route exact path='/couresesearch' render={() => (
          <SearchCourse msgAlert={msgAlert} user={user} search={search} display={display}/>
        )} />
        <Route exact path='/newyork' render={() => (
          <NewYork msgAlert={msgAlert} user={user}/>
        )} />
        <Route exact path='/boston' render={() => (
          <Boston msgAlert={msgAlert} user={user}/>
        )} />
        <Route exact path='/chicago' render={() => (
          <Chicago msgAlert={msgAlert} user={user}/>
        )} />
        <Route exact path='/losangeles' render={() => (
          <LosAngeles msgAlert={msgAlert} user={user}/>
        )} />
        <Route exact path='/lakecity' render={() => (
          <SaltLake msgAlert={msgAlert} user={user}/>
        )} />
        <Route exact path='/miami' render={() => (
          <Miami msgAlert={msgAlert} user={user}/>
        )} />
        <Route exact path='/coureseone' render={() => (
          <CourseOne msgAlert={msgAlert} user={user}/>
        )} />
        <Route exact path='/coursetwo' render={() => (
          <CourseTwo msgAlert={msgAlert} user={user}/>
        )} />
        <Route exact path='/coursethree' render={() => (
          <CourseThree msgAlert={msgAlert} user={user}/>
        )} />
        <Route exact path='/coursefour' render={() => (
          <CourseFour msgAlert={msgAlert} user={user}/>
        )} />
        <Route exact path='/coursefive' render={() => (
          <CourseFive msgAlert={msgAlert} user={user}/>
        )} />
        <Route exact path='/coursesix' render={() => (
          <CourseSix msgAlert={msgAlert} user={user}/>
        )} />
        <AuthenticatedRoute exact path='/shopping-cart' user={user} render={() => (
          <MyCart msgAlert={msgAlert} user={user}/>
        )} />
        <AuthenticatedRoute path='/checkout' user={user} render={() => (
          <Checkout msgAlert={msgAlert} customer={customer} user={user}
            buyHistory={buyHistory} setBuyHistory={setBuyHistory}/>
        )} />
        <AuthenticatedRoute user={user} path='/sign-out' render={() => (
          <SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} customer={customer} />
        )} />
        <AuthenticatedRoute user={user} path='/change-password' render={() => (
          <ChangePassword msgAlert={msgAlert} user={user} />
        )} />
        <AuthenticatedRoute path='/allapplications' user={user} render={() => (
          <ApplicationIndex msgAlert={msgAlert} user={user}/>
        )} />
        <AuthenticatedRoute path='/applications' user={user} render={() => (
          <Application msgAlert={msgAlert} user={user}/>
        )} />
        {/* <AuthenticatedRoute path='/applications/:id' user={user} render={({ match }) => (
            const appId = match.params.id
            return (
              <OneApplication addId={ appId } msgAlert={msgAlerts} user={user}/>
            )
        )} /> */}
        <AuthenticatedRoute path='/update/:id' user={user} render={({ match }) => (
          <ApplicationEdit msgAlert={msgAlert} user={user}/>
        )} />
        <AuthenticatedRoute exact path='/payment' user={user} render={() => (
          <StripeCheckoutForm msgAlert={msgAlert} user={user} customer={customer}
            buyHistory={buyHistory} setBuyHistory={setBuyHistory}/>
        )} />
      </main>
    </Fragment>
  )
}

export default App
