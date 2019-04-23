import React from 'react'


const Kurssi = (props) => {
    return (
        <div>
            <Otsikko kurssi={props.kurssi} />
            <Sisalto osat={props.kurssi.osat} />
            <Yhteensa table={props.kurssi.osat} />
        </div> 
    )
}

const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.kurssi.nimi}</h1>
        </div>
    )
}

const Sisalto = (props) => {
    //Kutsutaan jokaiselle taulukon alkiolle funktiota Osa -> map
    return (
        <div>
            {props.osat.map(osa => <Osa key={osa.id} osa={osa} />)}
        </div>
    )
}

const Osa = (props) => {
    return (
            <p>{props.osa.nimi} {props.osa.tehtavia}</p>
    )
}

//Destructurointi propseissa
const Yhteensa = ({table}) => {
    //Lasketaan summa taulukon alkioiden yli -> Reduce
    let total = table.reduce((sum, osa) => {
        console.log(sum, osa)
        return sum + osa.tehtavia
    }, 0)
    return (
        <div>
            <p>yhteensä {total} tehtävää</p>
        </div> 
    )
}

export default Kurssi