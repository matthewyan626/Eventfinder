import axios from "axios";


const url = "https://ipinfo.io/?token=c1b4830390e0b4"

const autodetect = async () => {
   const { data } = await axios.get(url);
   console.log('autodetect info: ', data)
   return data
}

export default autodetect