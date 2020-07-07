import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import { withRouter, Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const IndexMap = (props) => {
  const center = { lat: 35.0078, lng: -97.0929 }
  // const history = useHistory()
  const onMarkerClick1 = (event) => {
    props.history.push('/newyork')
  }
  const onMarkerClick2 = (event) => {
    props.history.push('/boston')
  }
  const onMarkerClick3 = (event) => {
    props.history.push('/chicago')
  }
  const onMarkerClick4 = (event) => {
    props.history.push('/losangeles')
  }
  const onMarkerClick5 = (event) => {
    props.history.push('/lakecity')
  }
  const onMarkerClick6 = (event) => {
    props.history.push('/miami')
  }
  const mapStyple = {
    marginTop: '1vw',
    width: '85vw',
    height: '40vw',
    display: 'flex',
    justifyContent: 'flex-start'
  }

  return (
    <div className='mapContainer' >
      <Map
        google={props.google}
        containerStyle={mapStyple}
        zoom={4.7}
        initialCenter={center}>
        <Marker key={'id1'} position={{ lat: 40.7128, lng: -74.0060 }} onClick={onMarkerClick1}/>
        <Marker key={'id2'} position={{ lat: 42.3601, lng: -71.0589 }} onClick={onMarkerClick2}/>
        <Marker key={'id3'} position={{ lat: 41.8781, lng: -87.6298 }} onClick={onMarkerClick3}/>
        <Marker key={'id4'} position={{ lat: 34.0522, lng: -118.2437 }} onClick={onMarkerClick4}/>
        <Marker key={'id5'} position={{ lat: 40.7608, lng: -111.8910 }} onClick={onMarkerClick5}/>
        <Marker key={'id6'} position={{ lat: 25.7617, lng: -80.1918 }} onClick={onMarkerClick6}/>
      </Map>

      <div className='belowMap'>
        <Card style={{ width: '20rem' }}>
          <Card.Img variant="top" src="https://ga-shop.s3.amazonaws.com/production/store/locationmasthead/13/image/thumb-35e8a4eb2638dba0e42e7de79585e063.jpg" />
          <Card.Body>
            <Card.Title>New York City</Card.Title>
            <Card.Text>
              <Link to='/newyork'>Manhattan</Link>
            </Card.Text>
            <Link to='/newyork'><Button variant="primary">See what is happening</Button></Link>
          </Card.Body>
        </Card>
        <Card style={{ width: '20rem' }}>
          <Card.Img variant="top" src="https://ga-shop.s3.amazonaws.com/production/store/locationmasthead/21/image/thumb-414c89f8bdc183929da3d0a7ba92bbdd.jpg" />
          <Card.Body>
            <Card.Title>Boston</Card.Title>
            <Card.Text>
              <Link to='/boston'>Financial District</Link>
            </Card.Text>
            <Link to='/boston'><Button variant="primary">See what is happening</Button></Link>
          </Card.Body>
        </Card>
        <Card style={{ width: '20rem' }}>
          <Card.Img variant="top" src="https://ga-shop.s3.amazonaws.com/production/store/locationmasthead/7/image/thumb-04f426ea6a344e3f256316b0e403e3cd.jpg" />
          <Card.Body>
            <Card.Title>Chicago</Card.Title>
            <Card.Text>
              <Link to='/chicago'>The Loop</Link>
            </Card.Text>
            <Link to='/chicago'><Button variant="primary">See what is happening</Button></Link>
          </Card.Body>
        </Card>
        <Card style={{ width: '20rem' }}>
          <Card.Img variant="top" src="https://ga-shop.s3.amazonaws.com/production/store/locationmasthead/11/image/thumb-da1d968ce7c72291d18928683fa9194e.jpg" />
          <Card.Body>
            <Card.Title>Los Angeles</Card.Title>
            <Card.Text>
              <Link to='/losangeles'>Downtown LA</Link>
            </Card.Text>
            <Link to='/losangeles'><Button variant="primary">See what is happening</Button></Link>
          </Card.Body>
        </Card>
        <Card style={{ width: '20rem' }}>
          <Card.Img variant="top" src="https://ga-shop.s3.amazonaws.com/production/store/locationmasthead/41/image/thumb-636388a6f99c45f8831946160133a014.jpg" />
          <Card.Body>
            <Card.Title>Salt Lake City</Card.Title>
            <Card.Text>
              <Link to='/lakecity'>Granary District</Link>
            </Card.Text>
            <Link to='/lakecity'><Button variant="primary">See what is happening</Button></Link>
          </Card.Body>
        </Card>
        <Card style={{ width: '20rem' }}>
          <Card.Img variant="top" src="https://ga-shop.s3.amazonaws.com/production/store/locationmasthead/28/image/thumb-d3377dca0eda5af6f599a5e7a5a13969.jpg" />
          <Card.Body>
            <Card.Title>Miami</Card.Title>
            <Card.Text>
              <Link to='/miami'>Wynwood</Link>
            </Card.Text>
            <Link to='/miami'><Button variant="primary">See what is happening</Button></Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBYmrQN48CK8S4nYqWJDxlb4CoJbpfglfw'
})(withRouter(IndexMap))
