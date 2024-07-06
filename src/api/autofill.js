import axios from 'axios'
import { API_URL } from '../utils/constants';


const autofill = async (userInput) => {

   const url = API_URL + 'search/autofill';
   console.log('autofilling', url)
   const { data } = await axios.get(url, {
      params: {
         userInput,
      },
   });
   console.log('Autofill Data: ', data._embedded);
   return (
      data._embedded
   )
}

export default autofill
