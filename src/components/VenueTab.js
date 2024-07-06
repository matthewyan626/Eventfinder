import { Container, Col, Row, Button, Card } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import VenueMap from './VenueMap'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

//AIzaSyAUOaqvIuBuaQqPT57bQ_t8qNu8IiJXGSw


const VenueTab = (venueDetails) => {


   const [venueName, setVenueName] = useState(false);
   const [address, setAddress] = useState(false);
   const [city, setCity] = useState(false);
   const [state, setState] = useState(false);
   const [phone, setPhone] = useState(false);
   const [hours, setHours] = useState(false);
   const [generalRules, setGeneralRules] = useState(false);
   const [childRules, setChildRules] = useState(false);
   const [addressLine, setAddressLine] = useState('');
   const [showMoreHours, setShowMoreHours] = useState(false);
   const [showMoreGeneral, setShowMoreGeneral] = useState(false);
   const [showMoreChild, setShowMoreChild] = useState(false);
   const [showMap, setShowMap] = useState(false);


   const showMoreInfo = 1000;
   const showLessInfo = 50;

   const venue = venueDetails.venueDetails._embedded.venues[0]


   const map = VenueMap(venue)

   const toggleHours = () => {
      setShowMoreHours(prevState => !prevState)
      console.log('changing hours: ', showMoreHours)
   }


   const toggleGeneral = () => {
      setShowMoreGeneral(prevState => !prevState)
      console.log('changing general: ', showMoreGeneral)
   }


   const toggleChild = () => {
      setShowMoreChild(prevState => !prevState)
      console.log('changing child: ', showMoreChild)
   }


   const toggleMapOn = () => {
      setShowMap(true);
      console.log('changing map state', showMap)
   }


   const toggleMapOff = () => {
      setShowMap(false);
      console.log('changing map state', showMap)
   }


/*    const getVenueMap = () => {
      const longitude = venue.location.longitude;
      const latitude = venue.location.latitude;
      console.log('long and lat: ', longitude, latitude);
   }
 */

   useEffect(() => {
      if(venue.name){
         setVenueName(true);
      }
      if (venue.address?.line1){
         setAddress(true);
         /* console.log('Setting date true'); */
      }
      if (venue.city?.name){
         setCity(true);
         console.log('Setting city true');
         setAddressLine(venue.city?.name);
         if (venue.state?.name){
            setState(true);
            /* console.log('Setting state true'); */
            setAddressLine(venue.address.line1 + ', ' + venue.city?.name + ', ' + venue.state?.name);
         }
      }
      if (venue.boxOfficeInfo?.phoneNumberDetail){
         setPhone(true);
         /* console.log('Setting phone true'); */
      }
      if (venue.boxOfficeInfo?.openHoursDetail){
         setHours(true);
         /* console.log('Setting hours true'); */
      }
      if (venue.generalInfo?.generalRule){
         setGeneralRules(true);
         /* console.log('Setting general rule true'); */
      }
      if (venue.generalInfo?.childRule){
         setChildRules(true);
         /* console.log('Setting child rule true'); */
      }
      /* if (venue.location?.latitude){
         getVenueMap();
      } */
   },[venueDetails])




  return (
   <Container
      style={{
      width:'80%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      flexDirection: 'column',
      padding: '2rem 0',
   }}
   >
      <Row>
         <Col
            xs={12}
            md={6}
            className={`${!hours && !generalRules && !childRules ? 'offset-md-3' : ''}`}
         >
            {venueName && (
               <>
               <h3>Name</h3>
               <p style={{marginBottom:'30px'}}>{venue.name}</p>
               </>
            )}
            {address && (
               <>
               <h3>Address</h3>
               <p style={{marginBottom:'30px'}}>{addressLine}</p>
               </>
            )}
            {phone && (
               <>
               <h3>Phone Number</h3>
               <p style={{marginBottom:'30px'}}>{venue.boxOfficeInfo?.phoneNumberDetail}</p>
               </>
            )}
         </Col>
         {hours || generalRules || childRules ? (
            <Col
               xs={12}
               md={6}
            >
               {hours && (
                  <>
                  <h3>Open Hours</h3>
                  <p style={{ maxHeight: showMoreHours ? showMoreInfo : showLessInfo , overflow: 'hidden', marginBottom:'0' }}>{venue.boxOfficeInfo.openHoursDetail}</p>
                  <Button onClick={toggleHours} variant='link' style={{marginBottom: '20px'}}>
                     {showMoreHours ? "Show less" : "Show more"}
                     <KeyboardArrowDownIcon style={{ color:'white' }}/>
                  </Button>
                  </>
               )}
               {generalRules && (
                  <>
                  <h3>General Rule</h3>
                  <p style={{ maxHeight: showMoreGeneral ? showMoreInfo : showLessInfo, overflow: 'hidden', marginBottom:'0' }}>{venue.generalInfo.generalRule}</p>
                  <Button onClick={toggleGeneral} variant='link' style={{marginBottom: '20px'}}>
                     {showMoreGeneral ? "Show less" : "Show more"}
                     <KeyboardArrowDownIcon style={{ color:'white' }}/>
                  </Button>
                  </>
               )}
               {childRules && (
                  <>
                  <h3>Child Rule</h3>
                  <div style={{ maxHeight: showMoreChild ? showMoreInfo : showLessInfo, overflow: 'hidden', marginBottom:'0' }}>{venue.generalInfo.childRule}</div>
                  <Button onClick={toggleChild} variant='link' style={{marginBottom: '20px'}}>
                     { showMoreChild ? 'Show less' : 'Show more' }
                     <KeyboardArrowDownIcon style={{ color:'white' }}/>
                  </Button>
                  </>
               )}
            </Col>)
         : null }
      </Row>
      <Row style={{marginTop: '30px'}}>
         <Button style={{ maxWidth: '500px', backgroundColor:'red', border:'0px' }} onClick={ toggleMapOn }>
            Show venue on Google map
         </Button>
      </Row>
      {showMap && (<div className='fixed-top center' style={{ padding:'10px' }}>
         <Card
            style={{
               backgroundColor: 'white',
               maxWidth: '450px',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               margin: 'auto',
               color: 'black',
               padding: '10px'
            }}
         >
            <Card.Header style={{backgroundColor:'white', width:'100%'}}>
               <h2 style={{textAlign:'left'}}>Event Venue</h2>
            </Card.Header>
            <Card.Body style = {{maxWidth:'450px', width:'100%'}}>
               {map}
               <Button onClick = { toggleMapOff } style ={{ backgroundColor:'black', alignContent:'left', marginTop: '24px', display:'flex'}}>
                  Close
               </Button>
            </Card.Body>  
         </Card>
      </div>)}        
   </Container>
  );
};

export default VenueTab;