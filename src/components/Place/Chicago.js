import React from 'react'
// import apiUrl from '../../apiConfig'
// import axios from 'axios'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import { withRouter } from 'react-router-dom'

const indexStyle = {
  marginTop: '20px',
  width: '30vw',
  height: '30vw'
}

const imagestyle = {
  width: '70rem',
  display: 'flex'
}

const Chicago = (props) => {
  const center = { lat: 41.8907, lng: -87.6269 }
  return (
    <div>
      <img style={imagestyle} src='https://cdn.choosechicago.com/uploads/2019/06/general-contact-1800x900.jpg'/>
      <div>
        <section className='newYorkWord'>
          <h2>Find us in Chicago</h2>
          <h4>ST Chicago @ 150 N Wacker</h4>
          <p>150 N Wacker, Suite 2600</p>
          <p>Chicago, IL 60606</p>
        </section>
        <section className='newYorkMap'>
          <Map
            google={props.google}
            containerStyle={indexStyle}
            zoom={20}
            initialCenter={center}>
            <Marker key={'id3'} position={center} />
          </Map>
        </section>
      </div>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBYmrQN48CK8S4nYqWJDxlb4CoJbpfglfw'
})(withRouter(Chicago))
