import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
    //counterien arvot
    const [hyva, setHyva] = useState(0)    
    const [neut, setNeut] = useState(0)    
    const [huono, setHuono] = useState(0)    

    const nappulat = ['Hyvä', 'Neutraali', 'Huono']
    const greeting = 'Hei unicafen asiakas! Anna palautetta'
    const subheader = 'Statistiikka:'
    
    //Tapahtumankäsittelijäfunktiot
    const hyvaHandler = () => {
        setHyva(hyva + 1)
        console.log('Nappia hyvä painettu')
    }
    const neutHandler = () => {
        setNeut(neut + 1)
        console.log('Nappia neut painettu')
    }
    const huonoHandler = () => {
        setHuono(huono + 1)
        console.log('Nappia huono painettu')
    }
    console.log('Counterit nyt: ', hyva, neut, huono)
    return (
        <div>
            <h1>Hei, anna palautetta!</h1>
            <Teenapit nappulat={nappulat} handlerit={[hyvaHandler, neutHandler, huonoHandler]}/>
            <h2>{subheader}</h2>
            <Teestats nappulat={nappulat} tila={[hyva, neut, huono]}/>
        </div>
    )
}


const Teenapit = (props) => {
    // Kutsutaan apufunktiota Teenappi jokaiselle alkiolle
    return (
        <div>         
           <Teenappi teksti={props.nappulat[0]} handler={props.handlerit[0]}/>
           <Teenappi teksti={props.nappulat[1]} handler={props.handlerit[1]}/>
           <Teenappi teksti={props.nappulat[2]} handler={props.handlerit[2]}/>
        </div>
    )
}

const Teenappi = (props) => {
    return (
        <button onClick={props.handler}>
            {props.teksti}
        </button>
    )
}

// Listaa statistiikan
const Teestats = (props) => {

    // Total count of votes
    const count = props.tila[0] + props.tila[1] + props.tila[2]
    console.log('sum: ', count)
    if (count === 0) {
        return (
            <div>
                <p>Ei vielä statistiikkaa</p>
            </div>
        ) 
    }
    else {
        const sum = props.tila[0] - props.tila[2]

        // Average ei voi olla const, jos halutaan roundata
        let average = sum / count
        //Jos average ei ole numero, eli on NaN
        if (isNaN(average)) {
            average = 0
        }
        console.log('average: ', average)
        //Roundataan average 1 desimaaliin
        average = average.toFixed(1)

        let positiveprocent = props.tila[0] / count
        //Jos positiveprocent ei ole numero
        if (isNaN(positiveprocent)) {
            positiveprocent = 0
        }
        positiveprocent = positiveprocent * 100
        positiveprocent = positiveprocent.toFixed(1)
        console.log('positive procent: ', positiveprocent)
        positiveprocent = positiveprocent.toString() + ' %'

        return (
            <div>
                <table>
                    <tbody>
                        <Teestat text="hyvä" value={props.tila[0]}/>
                        <Teestat text="neutraali" value={props.tila[1]}/>
                        <Teestat text="huono" value={props.tila[2]}/>
                        <Teestat text="yhteensä" value={count}/>
                        <Teestat text="Keskiarvo" value={average}/>
                        <Teestat text="Positiivisia" value={positiveprocent}/>
                    </tbody>
                </table>
            </div>   
        )
    }
}

const Teestat = (props) => {
    return (
        <tr><td>{props.text}</td><td>{props.value}</td></tr>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

