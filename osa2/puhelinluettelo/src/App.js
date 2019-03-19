import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Numerot from './components/Numerot'
import Uusi from './components/Uusi'
import Rajaa from './components/Rajaa'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNro, setNewNro] = useState('')
    const [search, setSearch] = useState('')

    //Haetaan data palvelimelta
    useEffect(() => {
        console.log('effect')
        axios
        .get('http://localhost:3001/persons')
        .then(resp => {
            console.log('promise fulfilled')
            setPersons(resp.data)
        })
    }, [])
    console.log('render', persons.length, 'persons');
    
    const handleChangeName = (event) => {
        setNewName(event.target.value)
    }
    const handleChangeNro = (event) => {
        setNewNro(event.target.value)
    }
    const handleChangeSearch= (event) => {
        setSearch(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
       
        //Tarkistetaan onko nimi jo taulukossa, jos ei, lisätään
        let is = persons.find(e => 0 === newName.localeCompare(e.name, undefined, {sensitivity: 'base'}))
        if (is === undefined){
            setPersons(persons.concat({name: newName, number: newNro}))
            console.log('uusi nimi: ', newName) 
          }else{
            console.log('NIMI ON JO')
            alert(`${newName} on jo luettelossa`)
          }
          reset()
    }
    //Resetoi tilassa olevat kentät newName ja newNro
    const reset = () => {
        setNewName('')
        setNewNro('')
    }

    return (
        <div>
            <h1>Puhelinluettelo</h1>
            <Rajaa search={search} handler={handleChangeSearch}/>
            <h2>Lisää uusi</h2>
            <Uusi handleSubmit={handleSubmit} newName={newName} newNro={newNro} changeName={handleChangeName} changeNro={handleChangeNro}/>
            <h2>Numerot</h2>
            <Numerot persons={persons} search={search}/>
        </div>
    )
}

export default App
