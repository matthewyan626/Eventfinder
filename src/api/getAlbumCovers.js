import { API_URL } from '../utils/constants'
import axios from 'axios'


const url = API_URL + 'search/getAlbumCovers'
export const getAlbumCovers = async (artist) => {
/*    console.log('param artist in getAlbumCovers is: ', artist, 'and artist.id is: ', artist.id);
 */   const { data } = await axios.get(url, {
      params: {  
            id: artist.id
         }
   });
   return data
}