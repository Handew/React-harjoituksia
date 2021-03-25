import axios from 'axios'

const baseUrl = "https://localhost:5001/api/employees"

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newEmployee => {
    return axios.post(baseUrl, newEmployee)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = changedEmployee => {
    return axios.put(`${baseUrl}/${changedEmployee.employeeId}`, changedEmployee)
}


export default { getAll, create, remove, update, setToken }