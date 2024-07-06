import debounce from 'debounce'
import { Form, Container, Row, Col, Button, Spinner } from 'react-bootstrap'
import { useCallback, useEffect, useState, useRef } from 'react'
import autofill from '../api/autofill.js'
import { searchEvents } from '../api/searchEvents.js'
import geolocate from '../api/geolocate.js'
import autodetect from '../api/autodetect.js'
import EventsTable from './EventsTable.js'
import NoResults from './NoResults.js'
import Navibar from './Navibar.js'







const Searchform = () => {

   const [keyword, setKeyword] = useState('');
   const [distance, setDistance] = useState(10);
   const [category, setCategory] = useState('');
   const [location, setLocation] = useState('');
   const [autoDetect, setAutoDetect] = useState(false);
   const [autoDetectLoc, setAutoDetectLoc] = useState(null);
   const [suggestions, setSuggestions] = useState([]);
   const [showSuggestions, setShowSuggestions] = useState(false);
   const [results, setResults] = useState(null);
   const [showDetails, setShowDetails] = useState(false);
   const [showNoResults, setShowNoResults] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const autoDetectRef = useRef(null);


   const getSuggestions = useCallback(async (userInput) => {
      try {
         setIsLoading(true);
         let suggestions = await autofill(userInput);
         if (!suggestions) suggestions = [{ name: 'No results found' }];
         console.log('Suggestions', suggestions);
         setIsLoading(false);
         setSuggestions(suggestions); 
      } catch (err){
         const message = err.response?.data.message ?? err.toString();
         window.alert(message);
      }
   })

   const debouncedGetSuggestions = useCallback(
      debounce(getSuggestions, 500),
      []
   );


   useEffect(() => {
      getAutodetect();
      handleAutodetectCheck();
   },[])

   useEffect(() => {
      if (keyword.length > 0){
         setShowSuggestions(true);
         setIsLoading(true);
         debouncedGetSuggestions(keyword);
      }else{
         setSuggestions([]);
         setIsLoading(false);
         setShowSuggestions(false);
      }
   },[keyword, debouncedGetSuggestions]);


   useEffect(() => {
      if (autoDetect){
         setLocation('');
      }
   },[autoDetect])


   const getAutodetect = async () => {
      try{
         const autoDetectInfo = await autodetect();
         setAutoDetectLoc(autoDetectInfo);
         console.log(autoDetectLoc, 'autoloc')
      }catch(err){
         const message = err.response?.data.message ?? err.toString();
         window.alert(message);
      }
   }


   const requestSearch = async (e) => {
      e.preventDefault();
      clearTableArea();
      setShowSuggestions(false);
      console.log('Submitted Form')
      try{
         let latitude = 0;
         let longitude = 0;
         if (autoDetect){
            const location = autoDetectLoc.loc
            const autoLat = location.substring(0, location.indexOf(','));
            const autoLong = location.substring(location.indexOf(',') + 1, location.length);
            console.log(autoLat, 'autolat');
            console.log(autoLong, 'autolong');
            latitude = autoLat;
            longitude = autoLong;
         }else{
            const geoData = await geolocate(location);
            console.log(geoData, 'geodata');
            if (geoData.results.length === 0) {
               setShowNoResults(true)
               return;
            }else{
               latitude = geoData.results[0].geometry.location.lat;
               longitude = geoData.results[0].geometry.location.lng;
               console.log(latitude, longitude, 'lat long')
            }
         }
         const userInput = {
            keyword: keyword.split(' ').join('+'),
            distance,
            category,
            latitude,
            longitude
         };
         
         console.log(userInput, 'this is userinput please');

         const searchResults = await searchEvents(userInput);

         if (searchResults.page.totalElements === 0){
            console.log('no results ahh');
            setShowNoResults(true);
         }
         if (searchResults._embedded){
            console.log('show details: ', showDetails);
            setResults(searchResults);
         }
      }catch(err){
         const message = err.response?.data.message ?? err.toString();
         window.alert(message);
      }
   }


   const toggleAutoDetect = () => {
      setAutoDetect(prevState => !prevState);
   }


   const handleAutodetectCheck = () => {
      autoDetectRef.current.checked = false
   }


   const clearForm = () => {
      setKeyword('');
      setDistance(10);
      setCategory('');
      setLocation('');
      setShowSuggestions('');
      setAutoDetect(false)
      handleAutodetectCheck();
      clearTableArea();
   }


   const clearTableArea = () => {
      setResults(null);
      setShowDetails(false);
      setShowNoResults(false);
   }


   return (
      <>
      <Navibar/>
      <Container style={{ paddingBottom: '50px' }}>
         <Form 
            className='rounded p-4'  
            style={{ marginBottom: '100px', maxWidth:'700px', marginTop:'40px'}}
            onSubmit={requestSearch}
         >
            <Row style={{marginTop:'30px', marginBottom: '10px', marginLeft: '10px', marginRight: '10px'}}>
               <h1 style={{marginBottom:'10px', fontSize:'40px'}}>Events Search</h1>
            </Row>
            <Row>
               <Col style={{marginBottom:'24px'}}>
                  <Form.Group 
                     controlId='formKeyword'
                     required
                  >
                     <Form.Label>Keyword<span style={{color: 'red'}}>*</span></Form.Label>   
                     {
                     <div style={{ position: 'relative' }}>
                        <Form.Control 
                           type='text'
                           autoComplete='off'
                           required
                           placehold='Enter keyword'
                           value={keyword}
                           onChange={async (e) => {
                              setKeyword(e.target.value);
                           }}
                        />
                        {showSuggestions && (
                           <div>
                           {isLoading ?
                              <Container 
                                 style={{
                                    position: 'absolute',
                                    width: '100%',
                                    paddingTop: '.5rem',
                                    paddingBottom: '.5rem',
                                    paddingLeft: '1rem',
                                    backgroundColor: 'white',
                                    border: '1px solid black',
                                    borderRadius: '.25rem',
                                    zIndex: 10,
                                    cursor: 'pointer',
                                 }}
                              >
                              <Spinner size='sm' />
                              </Container>
                              :
                              <Container 
                                 style={{
                                    position: 'absolute',
                                    width: '100%',
                                    paddingTop: '.5rem',
                                    paddingBottom: '.5rem',
                                    paddingLeft: '1rem',
                                    backgroundColor: 'white',
                                    border: '1px solid black',
                                    borderRadius: '.25rem',
                                    zIndex: 10,
                                    cursor: 'pointer',
                                 }}
                              >
                              <select 
                                 style={{
                                    width: '100%',
                                    border: '1px white',
                                    zIndex: 10,
                                    cursor: 'pointer',
                                 }}
                                 size={
                                    suggestions?.attractions?.length == 1 ? 1 : 
                                    suggestions?.attractions?.length == 2 ? 4 : 
                                    suggestions?.attractions?.length == 3 ? 6 :
                                    suggestions?.attractions?.length == 4 ? 7 : 
                                    suggestions?.attractions?.length == 5 ? 8 : 

                                    0
                                 }
                                 onChange={(e) => {
                                    setKeyword(e.target.value);
                              }}>
                                 {
                                 suggestions.attractions ?
                                 suggestions?.attractions?.map((suggestion, idx) => (
                                    <option
                                       key={idx}
                                       value={suggestion ? suggestion.name : ''}
                                       onClick={() => setShowSuggestions(false)}
                                       style={{ marginBottom: '1rem' }}
                                    >
                                       {suggestion ? suggestion.name : ''}
                                    </option>
                                 ))
                                 :
                                 <option>{suggestions[0]?.name}</option>
                                 }
                              </select>
                              </Container>
                           }
                           </div>
                           )}
                     </div>}
                  </Form.Group>
               </Col>
            </Row>
            <Row>
               <Col sm={12} md={6} style={{marginBottom:'24px'}}>
                  <Form.Group controlId='formDistance'>
                     <Form.Label>Distance</Form.Label>
                     <Form.Control type='number' required value={distance} onChange={(e) => setDistance(e.target.value)} />
                  </Form.Group>
               </Col>
               <Col sm={12} md={6} style={{marginBottom:'24px'}}>
                  <Form.Group controlId='formCategory'>
                     <Form.Label>Category<span style={{color: 'red'}}>*</span></Form.Label>
                     <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value=''>Default</option>
                        <option value='KZFzniwnSyZfZ7v7nJ'>Music</option>
                        <option value='KZFzniwnSyZfZ7v7nE'>Sports</option>
                        <option value='KZFzniwnSyZfZ7v7na'>Arts & Theatre</option>
                        <option value='KZFzniwnSyZfZ7v7nn'>Film</option>
                        <option value='KZFzniwnSyZfZ7v7n1'>Miscellaneous</option>
                     </Form.Select>
                  </Form.Group>
               </Col>
            </Row>
            <Row>
               <Col style={{marginBottom:'24px'}}>
                  <Form.Group controlId='formLocataion'>
                        <Form.Label>Location<span style={{color: 'red'}}>*</span></Form.Label>
                        <Form.Control 
                           type='location'
                           required
                           value={location}
                           onChange={(e) => setLocation(e.target.value)}
                           disabled={autoDetect}
                           autoComplete='off'
                        />
                  </Form.Group>
               </Col>
            </Row>
            <Row>
               <Col style={{marginBottom:'20px'}}>
                  <Form.Group>
                        <Form.Check
                           id='autodetect'
                           label='Auto-Detect Location'
                           onClick={() => toggleAutoDetect()}
                           ref={autoDetectRef}
                        />
                  </Form.Group>
               </Col>
            </Row>
            <Row>
               <Col style={{ display:'flex', justifyContent:'center'}}>
                  <Button variant='danger' type='submit' style={{ marginRight: '10px' }}>Search</Button>
                  <Button variant='primary' onClick={clearForm}>Clear</Button>
               </Col>
            </Row>
         </Form>
         {showNoResults && (<NoResults/>)}
         {results && (
            <EventsTable
               eventsInfo={results}
               showDetails={showDetails}
               setShowDetails={setShowDetails}
            />
         )}
      </Container>
      </>
   )
}

export default Searchform
