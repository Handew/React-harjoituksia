/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const url = "https://restapi2021.azurewebsites.net/api/authentication"

const authenticate = (userForAuth) => {
    const request = axios.post(url, userForAuth)
    console.log("-----request-------------")
    console.log(request)
    return request.then(response => response.data)
}

export default { authenticate }