import axios from 'axios'

const dotenv=require('dotenv')
dotenv.config({path:'../.env'})

const axiosInstance = axios.create({
    baseURL:`${process.env.REACT_APP_BASE_URL}`,
})

export default axiosInstance

