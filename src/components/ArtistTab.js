import { Carousel, Container, Table, Row, Col, Stack, Image, Button } from "react-bootstrap"
import CaroItem from './CaroItem'
import { useState, useEffect } from 'react'
import spotify from '../images/spotify.png'
import { CircularProgress, Typography, Box } from "@mui/material"
import NoResults from "./NoResults"



const ArtistTab = ({ artists, albumCovers, numArtists }) => {

   const [showNoArtists, setShowNoArtists] = useState(false);
   const [showSingleArtist, setShowSingleArtist] = useState(false);
   const [carouselData, setCarouselData] = useState('');
   const [showCarousel, setShowCarousel] = useState(false);
      
   /* console.log('artists ON ARTIST TAB:', artists)
   console.log('albumcovers:', albumCovers)
   console.log('numartists:', numArtists) */


   useEffect(() => {
      /* console.log('artists ON ARTIST TAB:', artists)
      console.log('albumcovers:', albumCovers)
      console.log('numartists:', numArtists) */
      if (numArtists == 0){
         setShowNoArtists(true);
      }else if (numArtists > 1){
         let carouselDetails = [];
         for (let i = 0; i < numArtists; i++){
            const details = {
               id: i,
               image: artists[i].body.artists.items[0].images[0].url,
               name: artists[i].body.artists.items[0].name,
               popularity: artists[i].body.artists.items[0].popularity,
               followers: artists[i].body.artists.items[0].followers.total.toLocaleString(),
               spotifyLink: artists[i].body.artists.items[0].external_urls.spotify,
               firstAlb: albumCovers[i].body.items[0].images[0].url,
               secondAlb: albumCovers[i].body.items[1].images[0].url,
               thirdAlb: albumCovers[i].body.items[2].images[0].url
            }
            carouselDetails.push(details);
         }
         /* console.log(carouselDetails); */
         setCarouselData(carouselDetails);
         setShowCarousel(true);
      }else{        
         setShowSingleArtist(true);
         /* console.log('showing single artist'); */
      }
   }, [artists])



   return ( 
      <>
      {showNoArtists && 
         (<Container style={{
            margin: 'auto 0',
            justifyContent: 'center',
            width:'100%',
         }}>
            <div style={{
               backgroundColor: 'white',
               justifyContent: 'center',
               borderRadius: '6px',
               display: 'flex',
               marginTop: '50px',
               justifyContent: 'center'  // add this line
            }}>
               <p style={{
                  color: 'red',
                  textAlign: 'center',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  margin:'0'
               }}>No music related artists details to show</p>
            </div>
         </Container>)
      }
      {showSingleArtist && (
         <Table style={{ textAlign: 'center', margin: 'auto', maxWidth:'1000px' }}>
            <Row  
               className='justify-content-center align-items-center' 
               style={{ textAlign: 'center', margin: 'auto', maxWidth:'1000px', padding:'30px' }}
            >
               <Col sm={12} md={3}>
                  <Image
                     className='artistImage'
                     src={artists[0].body.artists.items[0].images[0].url}
                     roundedCircle
                     style={{
                        objectFit: 'cover',
                        width: '12rem'
                     }}
                  />
                  <br/>
                  <h3>{artists[0].body.artists.items[0].name}</h3>
               </Col>
               <Col sm={12} md={9}>
                  <Row>
                     <Col m={12} md={4}>
                        <h3>Popularity</h3>
                        <Box sx={{ position: 'relative', color:'red'}}>
                           <CircularProgress variant="determinate" 
                              value={artists[0].body.artists.items[0].popularity}
                              text={`${artists[0].body.artists.items[0].popularity}`} 
                              color='inherit'
                              size='4rem'
                           />
                           <Box
                           sx={{
                              top: 0,
                              left: 0,
                              bottom: 0,
                              right: 0,
                              position: 'absolute',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                           }}
                           >
                           <Typography variant="caption" component="div" color="white" style={{ fontSize:'14px'}}>
                              {`${artists[0].body.artists.items[0].popularity}`}
                           </Typography>
                           </Box>
                        </Box>
                     </Col>
                     <Col sm={12} md={4}>
                        <h3>Followers</h3>
                        <p style={{ color:'white', fontSize: '18px' }}>{artists[0].body.artists.items[0].followers.total.toLocaleString()}</p>
                     </Col>
                     <Col sm={12} md={4}>
                        <h3>Spotify Link</h3><br/>
                        <a href={artists[0].body.artists.items[0].external_urls.spotify} target='_blank'>
                           <Image
                              src={spotify}
                              style={{
                                 objectFit: 'cover',
                                 width: '5rem'
                              }}
                           />
                        </a>
                     </Col>
                  </Row>
               </Col>
            </Row>
            <Row style={{ textAlign:'left', marginBottom:'30px', marginLeft:'20px'}}>
               <h3>Album featuring {artists[0].body.artists.items[0].name}</h3>
            </Row>
            <Row>
               <Col sm={12} md={4}>
                  <Image
                     className='artistImage'
                     src={albumCovers[0].body?.items[0]?.images[0]?.url}
                     style={{
                        objectFit: 'cover',
                        width: '75%'
                     }}
                  />
               </Col>
               <Col sm={12} md={4}>
                  <Image
                     className='artistImage'
                     src={albumCovers[0].body.items[1].images[0].url}
                     style={{
                        objectFit: 'cover',
                        width: '75%'
                     }}
                  />
               </Col>
               <Col sm={12} md={4}>
                  <Image
                     className='artistImage'
                     src={albumCovers[0].body.items[2].images[0].url}
                     style={{
                        objectFit: 'cover',
                        width: '75%'
                     }}
                  />
               </Col>
            </Row>
         </Table>
      )}

      {showCarousel && (
            <Carousel>
                  {carouselData.map((artist) => (
                     CaroItem(artist)
                  ))}
            </Carousel>
      )}
      </>
 
   )
}

export default ArtistTab;