import { useCallback, useEffect, useState} from 'react'
import { Card, Button, Tabs, Tab, Container, Row } from 'react-bootstrap'
import { getEventDetails } from '../api/getEventDetails'
import { getArtistDetails } from '../api/getArtistDetails'
import { getVenueDetails } from '../api/getVenueDetails'
import { getAlbumCovers } from '../api/getAlbumCovers'
import ArtistTab from './ArtistTab'
import EventTab from './EventTab'
import VenueTab from './VenueTab'
import ArrowBack from '@mui/icons-material/ArrowBack'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoritesTable from './FavoritesTable'
import _ from 'lodash'




const DetailsCard = ({ event, setShowDetails }) => {

   const [tab, setTab] = useState('events');
   const [eventDetails, setEventDetails] = useState(null);
   const [artistDetails, setArtistDetails] = useState(null);
   const [albumCovers, setAlbumCovers] = useState(null);
   const [venueDetails, setVenueDetails] = useState(null);
   const [numArtists, setNumArtists] = useState(0);
   const [isFavorite, setIsFavorite] = useState(JSON.parse(localStorage.getItem(event.id)) !== null);
   const [favoriteInfo, setFavoriteInfo] = useState('');


   const requestEventDetails = _.debounce((async (event) => {
      try { 
         const eventData = await getEventDetails(event.id);
         console.log('this is the eventData', eventData);
         setEventDetails(eventData);
      }catch(err){
         const response = err.response?.data.message ?? err.toString();
         window.alert(response);
      }
   }), 50);


   const requestArtistDetails = _.debounce((async (event) => {
      try {
         let artistData = { };
         for (let i = 0; i < event._embedded.attractions.length; i++){
            const spotifyData = await getArtistDetails(event._embedded.attractions[i])
            artistData[i] = spotifyData;
         }
         let carouselData = {};
         let count = 0;
         let accepted = 0;
         while (count < event._embedded.attractions.length) {
            if (event._embedded.attractions[count].classifications[0].segment.name === 'Music'){
               const artistDataName = artistData[count].body.artists.items[0].name;
               const eventDataName = event._embedded.attractions[count].name;
               if (artistDataName.toLowerCase() === eventDataName.toLowerCase()){
                  console.log('Artist Name to Lowercase: ', artistDataName.toLowerCase());
                  console.log('Event Name to Lowercase: ', eventDataName.toLowerCase());
                  console.log(artistDataName.toLowerCase() === eventDataName.toLowerCase());
                  carouselData[accepted] = artistData[count];
                  accepted++;
               }
            }
            count++;
         }
         setNumArtists(accepted);
         setArtistDetails(carouselData);
      }catch(err){
         const response = err.response?.data.message ?? err.toString();
         window.alert(response);
      }
   }), 500);


   const requestAlbumCovers = _.debounce((async (artistData) => {
      try {
         console.log('requesting album covers with these artists!!: ', artistData);
         console.log('number of artists for covers!!: ', numArtists);
         let albumCoverData = {};
         for (let i = 0; i < numArtists; i++){
            const coverData = await getAlbumCovers(artistData[i].body.artists.items[0]);
            albumCoverData[i] = coverData;
         }
         console.log ('Returned album cover data !!', albumCoverData);
         setAlbumCovers(albumCoverData);
      }catch(err){
         const response = err.response?.data.message ?? err.toString();
         window.alert(response);
      }
   }), 500);
   
 
   const requestVenueDetails = _.debounce((async (event) => {
      try { 
         console.log('requesting venue details with this info: ', event._embedded.venues[0])
         const venueData = await getVenueDetails(event._embedded.venues[0]);
         console.log('this is the venueData', venueData);
         setVenueDetails(venueData);
      }catch(err){
         const response = err.response?.data.message ?? err.toString();
         window.alert(response);
      }
   }), 500);


   const changeFavorite = () => {
      console.log('changing favorite from: ', isFavorite)
      setIsFavorite(true);
      alert('Event added to favorites!')
   }


   useEffect(() => {
      console.log('favorite changed to: ', isFavorite)
      console.log('sending favoriteinfo and isfavorite: ', favoriteInfo, isFavorite)
      if (isFavorite){
         localStorage.setItem(favoriteInfo.id, JSON.stringify(favoriteInfo));
         console.log(JSON.parse(localStorage.getItem(favoriteInfo.id)), 'stored with value')
      }else{
         localStorage.removeItem(favoriteInfo.id);
         console.log('removed from local storage', JSON.parse(localStorage.getItem(favoriteInfo.id)));
      }
   }, [isFavorite])


   useEffect(() => {
      let categories = '';
      if (event?.classifications?.[0]?.segment?.name) {
         categories += event.classifications[0].segment.name;
      }
      if (event?.classifications?.[0]?.genre?.name && event?.classifications?.[0]?.genre?.name != 'Undefined') {
         categories += (categories.length ? ' | ' : '') + event.classifications[0].genre.name;
      }
      if (event?.classifications?.[0]?.subGenre?.name && event?.classifications?.[0]?.subGenre?.name != 'Undefined') {
         categories += (categories.length ? ' | ' : '') + event.classifications[0].subGenre.name;
      }
      if (event?.classifications?.[0]?.type?.name && event?.classifications?.[0]?.type?.name != 'Undefined') {
         categories += (categories.length ? ' | ' : '') + event.classifications[0].type.name;
      }
      if (event?.classifications?.[0]?.subType?.name && event?.classifications?.[0]?.subType?.name != 'Undefined') {
         categories += (categories.length ? ' | ' : '') + event.classifications[0].subType.name;
      }
      console.log('printing categories: ', categories);
      const storeInfo = {
         id: event.id,
         date: event.dates.start.localDate,
         event: event.name,
         category: categories,
         venue: event._embedded.venues[0].name,
         timestamp: Date.now(),

      }
      setFavoriteInfo(storeInfo);
      requestEventDetails(event);
   },[])

   useEffect(() =>{
      console.log('requesting artist details in 2nd use effect')
      if (eventDetails){
         requestArtistDetails(event);
      }
   }, [eventDetails])

   useEffect(() => {
      console.log('ArtistData from the second use effect: ', artistDetails);
      if (artistDetails) {
         requestAlbumCovers(artistDetails);
      }
   }, [artistDetails] )


   useEffect(() =>{
      console.log('requesting venue details in 2nd use effect')
      if (artistDetails){
         requestVenueDetails(event);
      }
   }, [artistDetails])

   const back = () => {
      window.scrollTo(0,0);
      setShowDetails(false);
   }


   return (
      <Container style ={{ maxWidth: '1200px', marginBottom: '50px' }}>
         <Card
            style={{
               backgroundColor: 'rgba(120, 120, 120, 0.5)',
               backdropFilter: 'blur(6px)',
               borderRadius: '10px',
               color: 'white',
               width: '100%',
            }}
         >
            <Card.Header style ={{padding: '20px'}}>
               <Row>
                  <a onClick={back} style={{ cursor:'pointer', textDecoration:'underline' }}>
                     <ArrowBack/>
                     Back
                  </a>
               </Row>
               <Row>
                  <div style = {{ display: 'flex', justifyContent: 'center', gap: '1rem', padding: '2rem' }}>
                     <h2>{event?.name}</h2>
                     <Button
                        style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '100%',
                        width: '2.5rem',
                        height: '2.5rem',
                        color: 'red',
                        backgroundColor: 'white',
                        }}
                        onClick={changeFavorite}
                     >
                        {isFavorite ? <FavoriteIcon/>:<FavoriteBorder/>}
                     </Button>
                  </div>
               </Row>
            </Card.Header>   
            <Card.Body style={{ width: '100%', padding:'0', marginBottom:'50px' }}>
               <Tabs
                  activeKey={tab}
                  onSelect={(key) => setTab(key)}
                  fill
/*                   className='bg-info */
                  style={{
                     backgroundColor: '#1ebd88',
                     opacity: 0.8,
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                     flexWrap: 'wrap',
                  }}
               >
                  <Tab 
                     eventKey='events' 
                     title='Events'
                  >
                     {eventDetails && (<EventTab event={eventDetails}/>)}
                  </Tab>
                  <Tab
                     eventKey='artists'
                     title='Artists/Teams'
                     style={{ color: 'white' }}
                     
                  >
                     {artistDetails && albumCovers && (<ArtistTab 
                                          artists={artistDetails}
                                          albumCovers={albumCovers}
                                          numArtists={numArtists}
                                       />)}
                  </Tab>
                  <Tab 
                     eventKey='venue' 
                     title='Venue' 
                  >
                     {venueDetails &&
                           <VenueTab 
                              venueDetails={venueDetails}/>
                     }
                  </Tab>
               </Tabs>
            </Card.Body>
         </Card>
      </Container>
   )
}

export default DetailsCard
