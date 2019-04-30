import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async content => {
  const object = { content: content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const modify = async (id, object) => {
  console.log('anecdote service, modify: ', id, object)
  const response = await axios.put(`${baseUrl}/${id}`, object)
  console.log('response.data: ', response.data)
  return response.data
}

export default { 
  getAll,
  createNew,
  modify
}