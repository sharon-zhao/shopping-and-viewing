import React from 'react'
// import apiUrl from '../../apiConfig'
// import axios from 'axios'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import { withRouter } from 'react-router-dom'

const indexStyle = {
  marginTop: '20px',
  width: '30vw',
  height: '30vw',
  display: 'flex'
}

const imagestyle = {
  width: '70rem'
}

const Boston = (props) => {
  const center = { lat: 42.3530, lng: -71.0574 }
  return (
    <div>
      <img style={imagestyle} src='https://www.mccarter.com/wp-content/uploads/2019/10/Location-Boston.png'/>
      <div>
        <section className='newYorkWord'>
          <h2>Find us in Boston</h2>
          <h4>ST Boston</h4>
          <p>125 Summer Street 13th Floor</p>
          <p>Boston, MA 02110</p>
        </section>
        <section className='newYorkMap'>
          <Map
            google={props.google}
            containerStyle={indexStyle}
            zoom={20}
            initialCenter={center}>
            <Marker key={'id2'} position={center} />
          </Map>
        </section>
      </div>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBYmrQN48CK8S4nYqWJDxlb4CoJbpfglfw'
})(withRouter(Boston))
