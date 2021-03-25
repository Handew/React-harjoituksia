import axios from 'axios'

const url = "https://localhost:5001/api/authentication"

const authenticate = (userForAuth) => {
    const request = axios.post(url, userForAuth)
    console.log("-----request-------------")
    console.log(request)
    return request.then(response => response.data)
}

export default { authenticate }