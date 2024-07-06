import axios from 'axios'
import { API_URL } from '../utils/constants';


/* const url = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCQFhEZDsFLlcMRwKRf7bTKyoqMg3ot6V0&address="; */
const url = 'http://localhost:8080/api/search/geolocate';

const geolocate = async (location) => {
   /* const formatLoc = location.split(' ').join('+');
   const reqUrl = url + formatLoc;
   const { data } = await axios.get(reqUrl);
   return data */
   console.log('this is the geolocate url', url);
   const { data } = await axios.get(url, {
      params: {
         location,
      },
   });
   console.log('HELLO')
   console.log('returned data is:', data);
   return data
}

export default geolocate