import axios from 'axios'
import { API_URL } from '../utils/constants'


export const getVenueDetails = async (venue) => {
   const url = API_URL + 'search/getVenueDetails';
   console.log('this is venuename woo', venue)
   const { data } = await axios.get(url, {
      params: {
         venueName: venue.name
      }
   });
   console.log('Venue Data For Details: ', data);
   return data;
}