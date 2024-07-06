import axios from 'axios'
import { API_URL } from '../utils/constants'


export const searchEvents = async (userInput) => {
   const url = API_URL + 'search'
   console.log('searching with url:', url);
   console.log(userInput.keyword, 'keyword bleh');
   const { data } = await axios.get(url, {
      params: {
         /* userInput */
         keyword: userInput.keyword,
         distance: userInput.distance,
         category: userInput.category,
         latitude: userInput.latitude,
         longitude: userInput.longitude
      }
   });
   console.log(data);
   console.log('searching data:', data);
   return data;
}