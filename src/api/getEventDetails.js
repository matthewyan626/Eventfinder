import axios from 'axios'
import { API_URL } from '../utils/constants'


export const getEventDetails = async (id) => {
   const url = API_URL + 'search/getEventDetails';
   console.log('trying to get get event details with url: ', url);
   const { data } = await axios.get(url, {
      params: {
         id
      }
   }); 
   console.log('this is geteventdetails data', data );
   return data;
}