import { useState } from 'react'
import { Table,Container } from 'react-bootstrap'
import DetailsCard from './DetailsCard';


const EventsTable = ({
   eventsInfo,
   showDetails,
   setShowDetails
}) => {
   const searchResults = eventsInfo?._embedded.events;

   const [selectedEvent, setSelectedEvent] = useState(null);


   console.log('show details: ', showDetails);
   const select = (event) => {
      setShowDetails(true);
      setSelectedEvent(event);
      console.log('Selected Event: ', selectedEvent);
   }
   
   return (
      <>
      {!showDetails ? (
         <Container style={{ overflow:'scroll', scrollbarWidth:'0 px'}}>
         <Table striped bordered hover variant='dark' style={{textAlign:'center'}}>
            <thead style={{backgroundColor:'#212529'}}>
               <th>Date</th>
               <th>Icon</th>
               <th>Event</th>
               <th>Genre</th>
               <th>Venue</th>
            </thead>
            <tbody>
               {searchResults
                  .sort((a, b) => new Date(a.dates.start.localDate) - new Date(b.dates.start.localDate))
                  .slice(0, 20)
                  .map((event, index) => (
                     <tr
                        key={index}
                        style={{ cursor:'pointer' }}
                        onClick={() => select(event)}
                     >
                        <td>{event?.dates.start.localDate}<br/>{event?.dates.start.localTime}</td>
                        <td align='center'>
                           <img
                              src={event?.images[0].url}
                              alt='event img'
                              style={{
                                 objectFit: 'cover',
                                 width: '100px'
                              }}
                           />
                        </td>
                        <td>{event?.name}</td>
                        <td>{event?.classifications[0].segment.name}</td>
                        <td>{event?._embedded.venues[0].name}</td>
                     </tr>
               ))}
            </tbody>
         </Table>
      </Container>
   ) : (
      <DetailsCard
         event={selectedEvent}
         setShowDetails={setShowDetails}
      />
   )}
   </>
   )
}

export default EventsTable
