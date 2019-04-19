import { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  //Haetaan kannasta kaikki resurssit
  useEffect(() => {
    axios.get(baseUrl).then(response => {
      console.log('haetaan kaikki resurssit: ', response.data)
      setResources(response.data)
    })
  }, [])

  const create = async (newObj) => {
    //Luodaan uusi resurssi, viedään se kantaan ja lisätään se tilaan
    console.log('luodaan uusi olio: ', newObj)
    const response = await axios.post(baseUrl, newObj)
    console.log('response: ', response)
    setResources(resources.concat(newObj))
    return response.data
  }

  const service = {
    create
  }

  /* Palauttaa taulukon, jossa indeksillä
    0: kaikki resurssit taulukossa
    1: olio, jonka kautta voidaan lisätä uusi resurssi
  */
  return [
    resources, service
  ]
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}