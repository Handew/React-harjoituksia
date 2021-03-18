/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const baseUrl = "https://localhost:5001/api/customers"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newCustomer => {
    return axios.post(baseUrl, newCustomer)
}

const remove = id => axios.delete(`${baseUrl}/${id}`)

const update = changedCustomer => {
    return axios.put(`${baseUrl}/${changedCustomer.customerId}`, changedCustomer)
}


export default { getAll, create, remove, update }