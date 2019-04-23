import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

const App = () => {
    const [search, setSearch] = useState('')
    const [maat, setMaat] = useState([])
    const [selected, setSelected] = useState('')

    //Haetaan lista kaikista maista
    useEffect(() => {
        console.log('effect')
        axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(resp => {
            console.log('promise fulfilled')
            setMaat(resp.data)
        })
    }, [])

    const handleChangeSearch= (event) => {
        setSearch(event.target.value)
    }

    return (
        <div>
            <Rajaa search={search} handler={handleChangeSearch}/>
            <Maat maat={maat} search={search} setSelected={setSelected}/>
        </div>
    )
}

const Rajaa = (props) => {
    return (
        <div>
        find countries: <input type="text" value={props.search} onChange={props.handler}/>
        </div>
    )
}
const Maat = (props) => {
    //Tehdään uusi taulukko, jossa vain hakua vastaavat nimet
    let reg = new RegExp(props.search, 'i')
    console.log('reg: ', reg);
    let filtered = props.maat.filter(maa => reg.test(maa.name))
    if (filtered.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } 
    else if (filtered.length === 1) { // Vain yksi maa
        props.setSelected(filtered[0].name)
        return (
            <div>
                <Tiedot nimi={filtered[0].name} />
            </div>
        )
    }
    else {
        return (
            <div>
                {filtered.map(maa => <p key={maa.name}>{maa.name}</p>)}
            </div>
        )
    }
}

const Tiedot = (props) => {
    console.log('halutaan tiedot maasta: ', props.nimi)
    const [capital, setCapital] = useState('')
    const [population, setPopulation] = useState('')
    const [languages, setLanguages] = useState([])
    const [flag, setFlag] = useState('')
    const imgStyle = {
        width: '125px',
        height: '90px'
    }

    //Haetaan tiedot valitusta maasta, Efekti suoritetaan vain kerran
    useEffect(() => {
        console.log('effect (tiedot)')
        axios
        .get(`https://restcountries.eu/rest/v2/name/${props.nimi}?fullText=true`)
        .then(resp => {
            console.log('promise fulfilled (tiedot)')
            console.log('data: ', resp.data[0]);
            console.log('capital: ', resp.data[0].capital);
            setCapital(resp.data[0].capital)
            setPopulation(resp.data[0].population)
            setLanguages(resp.data[0].languages.map(l => l.name))
            setFlag(resp.data[0].flag)
        })
    }, [])

    console.log('saatiin: ', capital, population, languages);
    return (
        <div>
            <h1>{props.nimi}</h1>
            <p>capital: {capital}</p>
            <p>population: {population}</p>
            <h2>languages</h2>
            <ul>
            {languages.map(l => <li key={l}>{l}</li>)}
            </ul>
            <p><img src={flag} alt="" style={imgStyle}/></p>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
