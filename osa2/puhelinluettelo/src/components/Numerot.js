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
             {filtered.map(person => <p key={person.name}>{person.name}: {person.number}</p>)}
        </div>
    )
}

export default Numerot