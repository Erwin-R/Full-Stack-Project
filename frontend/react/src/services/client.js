//This file is where we are going to send the request to get all customers using axios
import axios from "axios";

export const getCustomers = async () => {
    try{
        //getting from our routes in backend folder
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/customers`)
    } catch (e) {
        throw e
    }
}