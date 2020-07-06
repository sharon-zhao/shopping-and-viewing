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

const Salt = (props) => {
  const center = { lat: 40.7608, lng: -111.8911 }
  return (
    <div>
      <img style={imagestyle} src='https://utahglobal.utah.edu/wp-content/uploads/2018/10/Salt-Lake-City-Utah-skyline-from-600-North-sky-10-10-SG3623_Full-1024x513.jpg'/>
      <div>
        <section className='newYorkWord'>
          <h2>Find us in Salt Lake City</h2>
          <h4>ST Salt Lake City</h4>
          <p>650 S 500 W</p>
          <p>Salt Lake City, 84101</p>
        </section>
        <section className='newYorkMap'>
          <Map
            google={props.google}
            containerStyle={indexStyle}
            zoom={20}
            initialCenter={center}>
            <Marker key={'id5'} position={center} />
          </Map>
        </section>
      </div>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBYmrQN48CK8S4nYqWJDxlb4CoJbpfglfw'
})(withRouter(Salt))
