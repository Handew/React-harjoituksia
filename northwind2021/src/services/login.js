/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const baseUrl = "https://restapi2021.azurewebsites.net/api/logins"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newLogin => {
    return axios.post(baseUrl, newLogin)
}

const remove = id => axios.delete(`${baseUrl}/${id}`)

const update = changedLogin => {
    return axios.put(`${baseUrl}/${changedLogin.loginId}`, changedLogin)
}



export default { getAll, create, remove, update }