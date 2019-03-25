import React, {useState, useEffect} from 'react';
import Numerot from './components/Numerot'
import Uusi from './components/Uusi'
import Rajaa from './components/Rajaa'
import personService from './services/persons'
import Kayttajaviestit from './components/Kayttajaviestit'

//Puhelinluettelo Frontend

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNro, setNewNro] = useState('')
    const [search, setSearch] = useState('')
    const [message, setMessage] = useState('')
    const [err, setErr] = useState(false)

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
        
        //Tarkistetaan onko nimi jo taulukossa
        let is = persons.find(e => 0 === newName.localeCompare(e.name, undefined, {sensitivity: 'base'}))
        if (is === undefined){ //Jos ei, tallennetaan suoraan
            const obj = {
                name: newName,
                number: newNro
            } 
            personService
            .create(obj)
            .then(returnedPers => {
                setPersons(persons.concat(returnedPers))
                setMessage(`Lisättiin ${returnedPers.name}`)
                setErr(false)
                setTimeout(() => {
                    setMessage('')
                }, 5000)
            })
          }else{
            console.log('Nimi on jo.')
            //Käyttäjän täytyy vahvistaa
            const answer = window.confirm(`${newName} on jo luettelossa. Korvataanko vanha numero uudella?`)
            if (answer) { //Korvataan
                //Haetaan person jolla sama nimi
                const pers = persons.find(p => p.name === newName)
                //Luodaan uusi olio, joka on kopio mutta muutetaan numero
                const modifiedPers = {...pers, number: newNro}
                personService
                .update(pers.id, modifiedPers)
                .then(returnedPers => {
                    setPersons(persons.map(p => p.id !== pers.id ? p : returnedPers))
                    setMessage(`Käyttäjän ${newName} numero päivitettiin`)
                    setErr(false)
                    setTimeout(() => {
                        setMessage('')
                    }, 5000)
                })
                .catch(error => {
                    setMessage(`Käyttäjä ${newName} oli jo poistettu.`)
                    setErr(true)
                    setTimeout(() => {
                        setMessage('')
                    }, 5000)
                    //Renderöinti??
                    personService
                    .getAll()
                    .then(allPersons => {
                        console.log('LADATAAN PALVELIMELTA')
                        setPersons(allPersons)
                    }) 
                })
            }
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
            //const url = `http://localhost:3001/persons/${id}`
            personService
            .remove(id)
            .then(resp => {
                console.log(resp)
                setPersons(persons.filter(p => p.id !== id))
                setMessage(`Poistettiin ${name}`)
                setErr(false)
                setTimeout(() => {
                    setMessage('')
                }, 5000)
            })
            .catch(error => {
                setMessage(`Käyttäjä ${newName} oli jo poistettu.`)
                setErr(true)
                setTimeout(() => {
                    setMessage('')
                }, 5000)
            })
        } else {
            console.log('peruutettiin');
        }
    }

    return (
        <div>
            <h1>Puhelinluettelo</h1>
            <Kayttajaviestit message={message} err={err}/>
            <Rajaa search={search} handler={handleChangeSearch}/>
            <h2>Lisää uusi</h2>
            <Uusi handleSubmit={handleSubmit} newName={newName} newNro={newNro} changeName={handleChangeName} changeNro={handleChangeNro}/>
            <h2>Numerot</h2>
            <Numerot persons={persons} search={search} removeId={removeId}/>
        </div>
    )
}

export default App
