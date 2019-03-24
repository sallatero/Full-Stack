import axios from 'axios'
//const baseUrl = 'http://localhost:3001/api/persons'
//const baseUrl = 'https://dry-meadow-49016.herokuapp.com/api/persons'
const baseUrl = '/api/persons'

//Puhelinluettelo Frontendin palvelinkeskustelija

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(resp => resp.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(resp => resp.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(resp => resp.data)
}

//Poisto tapahtuu HTTP DELETE-pyynnöllä resurssin osoitteeseen, ei tarvi lähettää dataa
const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(resp => resp.data)
}

export default {getAll, create, update, remove}