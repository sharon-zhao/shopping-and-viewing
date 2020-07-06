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

const Miami = (props) => {
  const center = { lat: 25.8305, lng: -80.1803 }
  return (
    <div>
      <img style={imagestyle} src='https://www.copaair.com/promotions/airtrfx-lp/MIA-cover-md.jpg'/>
      <div>
        <section className='newYorkWord'>
          <h2>Find us in Wynwood</h2>
          <h4>ST Miami</h4>
          <p>Cambridge Innovation Center</p>
          <p>1951 NW 7th AVE Miami, FL 33136</p>
        </section>
        <section className='newYorkMap'>
          <Map
            google={props.google}
            containerStyle={indexStyle}
            zoom={20}
            initialCenter={center}>
            <Marker key={'id6'} position={center} />
          </Map>
        </section>
      </div>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBYmrQN48CK8S4nYqWJDxlb4CoJbpfglfw'
})(withRouter(Miami))
