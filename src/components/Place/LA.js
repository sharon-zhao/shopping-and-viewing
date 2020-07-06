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

const LosAngeles = (props) => {
  const center = { lat: 34.0479, lng: -118.2401 }
  return (
    <div>
      <img style={imagestyle} src='https://cdn.vox-cdn.com/thumbor/MLfoFi_Xmnov6slcKFPQxLoOqUk=/0x0:3992x2992/1200x675/filters:focal(1648x642:2286x1280)/cdn.vox-cdn.com/uploads/chorus_image/image/55813197/LA_Shutterstock.29.jpg'/>
      <div>
        <section className='newYorkWord'>
          <h2>Find us in Los Angeles</h2>
          <h4>ST Los Angeles (DTLA)</h4>
          <p>360 E. 2nd Street, Suite 400</p>
          <p>Los Angeles, CA 90012</p>
        </section>
        <section className='newYorkMap'>
          <Map
            google={props.google}
            containerStyle={indexStyle}
            zoom={20}
            initialCenter={center}>
            <Marker key={'id4'} position={center} />
          </Map>
        </section>
      </div>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBYmrQN48CK8S4nYqWJDxlb4CoJbpfglfw'
})(withRouter(LosAngeles))
