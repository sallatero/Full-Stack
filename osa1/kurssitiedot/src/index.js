import React from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10,
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14,
            }
        ]
    }

    return (
        <div>
            <Header kurssi={kurssi.nimi}/>
            <Content osat={kurssi.osat} />
            <Total osat={kurssi.osat} />
        </div>
    )

}


const Header = (props) => {
    return (
        <div>
            <h1>{props.kurssi}</h1>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <Osa osa={props.osat[0]}/>
            <Osa osa={props.osat[1]}/>
            <Osa osa={props.osat[2]}/>
        </div>
    )
}

const Osa = (props) => {
    return (
            <p>{props.osa.nimi} {props.osa.tehtavia}</p>
    )
}

const Total = (props) => {
    let total = props.osat[0].tehtavia + props.osat[2].tehtavia + props.osat[2].tehtavia 
    return (
        <div>
            <p>yhteensä {total} tehtävää</p>
        </div> 
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

