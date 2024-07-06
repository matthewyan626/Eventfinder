import { useState, useEffect } from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';
import { Icon, IconButton } from '@mui/material';
import Facebook from '@mui/icons-material/Facebook'
import Twitter from '@mui/icons-material/Twitter'




const EventTab = ({ event }) => {

   const [date, setDate] = useState(false);
   const [artists, setArtists] = useState(false);
   const [venue, setVenue] = useState(false);
   const [segment, setSegment] = useState(false)
   const [genre, setGenre] = useState(false);
   const [subGenre, setSubGenre] = useState(false);
   const [type, setType] = useState(false);
   const [subType, setSubType] = useState(false);
   const [priceRange, setPriceRange] = useState(false);
   const [ticketStatus, setTicketStatus] = useState(false);
   const [buyAt, setBuyAt] = useState(false);
   const [seatMap, setSeatMap] = useState(false);

   console.log('EventTab DATA:', event);

   useEffect(() => {
      if (event?.dates?.start?.localDate){
         setDate(true);
         /* console.log('Setting date true'); */
      }
      if (event?._embedded.attractions){
         setArtists(true);
         /* console.log (event?._embedded?.attractions?.length)
         console.log('Setting artists true'); */
      }
      if (event?._embedded?.venues){
         setVenue(true);
         console.log('Setting venue true');
      }
      if (event?.classifications?.[0]?.segment?.name){
         setSegment(true);
      }
      if (event?.classifications?.[0]?.genre?.name && event?.classifications?.[0]?.genre?.name != 'Undefined'){
         setGenre(true);
      }
      if (event?.classifications?.[0]?.subGenre?.name && event?.classifications?.[0]?.subGenre?.name != 'Undefined'){
         setSubGenre(true);
      }
      if (event?.classifications?.[0]?.type?.name && event?.classifications?.[0]?.type?.name != 'Undefined'){
         setType(true);
      }
      if (event?.classifications?.[0]?.subType?.name && event?.classifications?.[0]?.subType?.name != 'Undefined'){
         setSubType(true);
      }
      
      if (event?.priceRanges?.[0]?.max || event?.priceRanges?.[0]?.min){
         setPriceRange(true);
         console.log('Setting price range true');
      }
      if (event?.dates?.status?.code){
         setTicketStatus(true);
      }
      if (event?.url){
         setBuyAt(true);
         console.log('Setting buy url true'); 
      }
      if (event?.seatmap){
         setSeatMap(true);
         console.log('Setting seat map true'); 
      }
   }, [])


   const handleTwitter = () => {
       const tweet = `Check out ${event.name} on TicketMaster!`;
         const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
         tweet
      )}&url=${encodeURIComponent(event.url)}`;
      window.open(tweetUrl, '_blank');
   }
  
   const handleFacebook = () => {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
           event.url
      )}`;
      window.open(facebookUrl, '_blank');
   };
   
   const status = (statusCode) => {
      let status = statusCode;
      if (status == "onsale") {
        status = <p className='onSale'>On Sale</p>;
      } else if (status == "offsale") {
        status = <p className='offSale'>Off Sale</p>;
      } else if (status == "cancelled") {
        status = <p className='cancelled'>Cancelled</p>;
      } else if (status == "postponed") {
        status = <p className='postponed'>Postponed</p>;
      } else if (status == "rescheduled") {
        status = <p className='rescheduled'>Rescheduled</p>;
      }
      return status;
   }



   return (
      <Container
         style={{
         width: '80%',
         textAlign: 'center'
         }}
      >
         <Row>
            <Col
               xs={12}
               md={4}
               className='mx-auto my-auto'
               style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  padding: '2rem 0',
               }}
            >
            {date &&
               <>
               <h3>Date</h3>
               <p>{event?.dates.start.localDate} <br/> {event?.dates.start.localTime}</p> 
               </>
            }
            {artists &&
               <>
               <h3>Artists/Team</h3>
               <p>
                  {event?._embedded?.attractions.map((attraction, idx) => (
                  <span key={idx}>
                     {attraction.name}
                     {idx !== event._embedded.attractions.length - 1 && ' | '}
                  </span>
                  ))}
               </p>
               </>
            }
            {venue &&
               <>   
               <h3>Venue</h3>
               <p>{event?._embedded.venues[0].name}</p>
               </>
            }
            {segment &&
               <>
               <h3>Genre</h3>
               <p>
               {segment &&
               `${event.classifications[0].segment.name}`}
               {genre &&
               ` | ${event.classifications[0].genre.name} `}
               {subGenre &&
               ` | ${event.classifications[0].subGenre.name}`}
               {type &&
               ` | ${event.classifications[0].type.name}`}
               {subType &&
               ` | ${event.classifications[0].subType.name}`}
               </p> 
               </>
            }
            {priceRange &&
               <>
               <h3>Price Ranges</h3>
               <p>{event?.priceRanges[0]?.min} - {event?.priceRanges[0]?.max}</p>
               </>
            }
            {ticketStatus &&
               <>
               <h3>Ticket Status</h3>
               {status(event.dates.status.code)}
               </>
            }
            {buyAt &&
               <>
               <h3>Buy Tickets at</h3>
               <a href={event.url} target='_blank'>Ticketmaster</a>
               </>
            }
         </Col>
         {seatMap &&
            <>
            <Col
               xs={12}
               md={8}
               className='mx-auto my-auto'
               style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
               }}
            >
               <Image
                  src={event.seatmap.staticUrl}
                  alt='eventVenue'
                  style={{
                     objectFit: 'cover',
                     width: '100%'
                  }}
               />
            </Col>
            </>
         }
      </Row>
      <Row
        s={12}
        m={12}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
         Share on:
         <IconButton
            style={{
               objectFit: 'cover',
               width: '3rem',
               height: '2rem',
               backgroundColor: 'transparent',
               cursor: 'pointer',
            }}
            onClick = {handleTwitter}
         >
            <Twitter style={{ color:'rgb(90, 213, 235)' }}/>
         </IconButton>
         <IconButton
            style={{
               objectFit: 'cover',
               width: '3rem',
               height: '2rem',
               backgroundColor: 'transparent',
               cursor: 'pointer',
            }}
            onClick = {handleFacebook}
         >
            <Facebook color='primary'/>
         </IconButton>
      </Row>
    </Container>
  );
}

export default EventTab;