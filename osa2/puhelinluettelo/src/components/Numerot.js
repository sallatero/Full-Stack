import React from 'react';


const Numerot = (props) => {
    console.log('Numerot alussa: ', props.persons);
    console.log('Search: ', props.search);

    //Tehdään uusi taulukko, jossa vain hakua vastaavat nimet
    let reg = new RegExp(props.search, 'i')
    console.log('reg: ', reg);
    let filtered = props.persons.filter(person => reg.test(person.name))
    console.log('filtered: ', filtered);
    
    return (
        <div className="name-list">
             {filtered.map(person => <Person key={person.id} person={person} remove={() => props.removeId(person.id)}/>)}
        </div>
    )
}

const Person = (props) => {
    return (
        <p>{props.person.name}: {props.person.number}<button onClick={props.remove}>poista</button></p>
    )
}

/*
const Poistonappi = (props) => {
    //onClickille pitää antaa funktio, eli () => tapahtumankästehdas(id)
    return <button onClick={() => props.removeId(props.id)}>poista</button>
}*/

export default Numerot