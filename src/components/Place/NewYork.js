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
  height: '31rem',
  display: 'flex'
}

const NewYork = (props) => {
  const center = { lat: 40.7398, lng: -73.9902 }
  return (
    <div>
      <img style={imagestyle} src='https://matter.imgix.net/uploads/new-york-city-cropped.png?ixlib=jekyll-1.1.0&w=2400'/>
      <div>
        <section className='newYorkWord'>
          <h2>Find us in New York City</h2>
          <h4>ST NYC (Manhattan), Classrooms</h4>
          <p>10 East 21st Street</p>
          <p>New York, NY 10010</p>
        </section>
        <section className='newYorkMap'>
          <Map
            google={props.google}
            containerStyle={indexStyle}
            zoom={20}
            initialCenter={center}>
            <Marker key={'id1'} position={center} />
          </Map>
        </section>
      </div>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBYmrQN48CK8S4nYqWJDxlb4CoJbpfglfw'
})(withRouter(NewYork))
