import { Carousel, Table, Row, Col, Image, Label } from "react-bootstrap"
import { CircularProgress, Typography, Box } from "@mui/material"
import spotify from '../images/spotify.png'


const CaroItem = (artist) => {

   
   /* console.log('artist on caroitem ~~~~~~', artist) */

   return (
      <Carousel.Item style={{ marginBottom: '50px' }}>
         <Table style={{ textAlign: 'center', margin: 'auto', maxWidth:'1000px' }}>
            <Row 
               className='justify-content-center align-items-center' 
               style={{ textAlign: 'center', margin: 'auto', maxWidth:'1000px', padding:'30px' }}
            >
             <Col sm={12} md={3}>
                  <Image
                     className='artistImage'
                     src={artist.image}
                     roundedCircle
                     style={{
                        objectFit: 'cover',
                        width: '12rem'
                     }}
                  />
                  <br/>
                  <h3>{artist.name}</h3>
               </Col>
               <Col sm={12} md={9}>
                  <Row>
                     <Col sm={12} md={4}>
                        <h3>Popularity</h3>
                        <Box sx={{ position: 'relative', color:'red'}}>
                           <CircularProgress variant="determinate" 
                              value={artist.popularity}
                              text={`${artist.popularity}`} 
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
                              {`${artist.popularity}`}
                           </Typography>
                           </Box>
                        </Box>
                     </Col>
                     <Col sm={12} md={4}>
                        <h3>Followers</h3>
                        <p style={{ color:'white', fontSize: '18px' }}>{artist.followers}</p>
                     </Col>
                     <Col sm={12} md={4}>
                        <h3>Spotify Link</h3>
                        <br/>
                        <a href={artist.spotifyLink} target='_blank'>
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
               <h3>Albums featuring {artist.name}</h3>
            </Row>
            <Row>
               <Col sm={12} md={4}>
                  <Image
                     className='artistImage'
                     src={artist.firstAlb}
                     style={{
                        objectFit: 'cover',
                        width: '75%'
                     }}
                  />
               </Col>
               <Col sm={12} md={4}>
                  <Image
                     className='artistImage'
                     src={artist.secondAlb}
                     style={{
                        objectFit: 'cover',
                        width: '75%'
                     }}
                  />
               </Col>
               <Col sm={12} md={4}>
                  <Image
                     className='artistImage'
                     src={artist.thirdAlb}
                     style={{
                        objectFit: 'cover',
                        width: '75%'
                     }}
                  />
               </Col>
            </Row>
         </Table>
      </Carousel.Item>
   )
}

export default CaroItem
