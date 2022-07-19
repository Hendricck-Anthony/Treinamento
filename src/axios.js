import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:`http://149.56.66.151:3000`
})

export default axiosInstance

