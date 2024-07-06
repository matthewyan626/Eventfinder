import { useEffect, useState } from 'react'
import { Table, Button, Alert, Container } from 'react-bootstrap'
import DeleteIcon from '@mui/icons-material/Delete'


const FavoritesTable = () => {

   const [favoriteKeys, setFavoriteKeys] = useState([]);
   const [ordered, setOrdered] = useState([]);

   console.log(Object.keys(localStorage),' no keys')

   useEffect(() => {
      setFavoriteKeys(Object.keys(localStorage))
      console.log('setting favorite keys', favoriteKeys);
   }, []);

   useEffect(() => {
      console.log(favoriteKeys, 'favorite keys');
      const sortedLocal = sortLocalStorage();
      if (sortedLocal){
         setOrdered(sortedLocal);
      }
      console.log(ordered, 'these are ordered entries')
   },[favoriteKeys])
   

   const sortLocalStorage = () => {
      const items = Object.keys(localStorage)
      .map((key) => {
         try{
            return JSON.parse(localStorage.getItem(key));
         }catch(error) {
            return null;
         }
      })
      .filter((item) => {
         return item && typeof item === 'object' && item.event;
      })
      .sort((a, b) => a.timestamp - b.timestamp);
      console.log('SORTED: ', items);
      return items.length ? items : null;
   }



   const removeFavorite = (key) => {
      setOrdered(null);
      console.log('removing key: ', key);
      localStorage.removeItem(key);
      setFavoriteKeys(Object.keys(localStorage))
   }

   return (
      <>
      <Container>
         {ordered && Object.keys(localStorage).length != 0 &&
            <div>
               <h3 style={{textAlign:'center', padding: '30px', display:'flex', justifyContent:'center'}}>List of your favorite events</h3>
               <div style={{ overflow:'scroll' }}>
               <Table striped bordered hover variant='light' style={{borderRadius:'8px !important', textAlign:'center'}}>
                  <thead>
                     <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Event</th>
                        <th>Category</th>
                        <th>Venue</th>
                        <th>Favorite</th>
                     </tr>
                  </thead>
                  <tbody>
                     {ordered?.map((favorite, index) => {
                        return (
                        <tr key={favorite.id}>
                        <td>{index + 1}</td>
                        <td>{favorite.date}</td>
                        <td>{favorite.event}</td>
                        <td>{favorite.category}</td>
                        <td>{favorite.venue}</td>
                        <td><Button onClick={() => {removeFavorite(favorite.id); alert('Removed from favorites!')}}><DeleteIcon/></Button></td>
                     </tr>
                     );
                     })}
               </tbody>
            </Table>
            </div>
         </div>
         }
         {Object.keys(localStorage).length == 0 &&
            <>
            <Container
               style={{
               backgroundColor: 'white',
               borderRadius: '8px',
               marginTop:'50px'
            }}>
               <Table>
                  <thead>
                     <tr><th style={{color:'red', textAlign: 'center'}}>No favorite events to show</th></tr>
                  </thead>
               </Table>
            </Container>
            </>
         }
      </Container>
      </>
  )
}

export default FavoritesTable
