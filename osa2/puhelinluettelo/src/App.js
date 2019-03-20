import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Numerot from './components/Numerot'
import Uusi from './components/Uusi'
import Rajaa from './components/Rajaa'
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNro, setNewNro] = useState('')
    const [search, setSearch] = useState('')

    //Haetaan data palvelimelta
    useEffect(() => {
        console.log('effect')
        personService
        .getAll()
        .then(initialPersons => {
            console.log('promise fulfilled')
            setPersons(initialPersons)
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
            const obj = {
                name: newName,
                number: newNro
            } 
            personService
            .create(obj)
            .then(returnedPers => {
                console.log('uusi obj lisätty: ', obj)
                setPersons(persons.concat(returnedPers))
            })
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

    const removeId = id => {
        console.log(`tyyppiä jonka id on ${id} halutaan poistaa`)
        //Pyydetään käyttäjää varmistamaan
        const p = persons.filter(p => p.id === id)
        const name = p[0].name
        const answer = window.confirm(`Poistetaanko ${name}?`)
        if (answer) {
            const url = `http://localhost:3001/persons/${id}`
            personService
            .remove(id)
            .then(resp => {
                console.log(resp)
                setPersons(persons.filter(p => p.id !== id))
            })
        } else {
            console.log('peruutettiin');
        }
    }

    return (
        <div>
            <h1>Puhelinluettelo</h1>
            <Rajaa search={search} handler={handleChangeSearch}/>
            <h2>Lisää uusi</h2>
            <Uusi handleSubmit={handleSubmit} newName={newName} newNro={newNro} changeName={handleChangeName} changeNro={handleChangeNro}/>
            <h2>Numerot</h2>
            <Numerot persons={persons} search={search} removeId={removeId}/>
        </div>
    )
}

export default App
