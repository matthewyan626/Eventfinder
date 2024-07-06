import { API_URL } from '../utils/constants'
import axios from 'axios'


const url = API_URL + 'search/getArtistDetails'
export const getArtistDetails = async (artist) => {
   console.log('param artist in getArtistDetails is: ', artist)
   const { data } = await axios.get(url, {
      params: {
         artistName: artist.name
      }
   });

   console.log('spotify data', data);
   return data
}