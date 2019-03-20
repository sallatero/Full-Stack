import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [pisteet, setPisteet] = useState(new Uint8Array(6))
    
    const handlerRandom = () => {
        return () => {
            console.log('RANDOM')
            // Random numero 0 -> 5
            // Math.floor(Math.random() * (max-min+1)) + min;
            const ran = Math.floor(Math.random() * 6);
            setSelected(ran)
            console.log('random: ', ran)                
        }
    }
    //poistan handlerVotesta propsin ja luen suoraan selectedin
    const handlerVote = () => {
        return () => {
            console.log('vote-> pisteet alussa: ', pisteet)
            const t = pisteet.map((p, i) => i === selected ? p + 1 : p)
            setPisteet(t)
            console.log('vote-> pisteet lopussa: ', pisteet)  
        }
    }
    console.log('rendröidään: ', pisteet);
    return (
        <div>
            <p>{props.anecdotes[selected]}</p>
            <p className="vote">This has {pisteet[selected]} votes</p>
            <Teenappi handler={handlerVote()} text='Vote'/>
            <Teenappi handler={handlerRandom()} text='Next anecdote'/>
            <h2>Anecdote with most votes</h2>
            <Mostvotes pisteet={pisteet} anekdootit={props.anecdotes} />
        </div>
    )
}

// Anekdootti jolla eniten ääniä
//props: pisteet-taulukko, anekdootit=taulukko anekdooteista
const Mostvotes = (props) => {
    let maxValue = -1
    let maxIndex = -1
    let maxAnek = ''
    console.log('alussa: maxValue ', maxValue, ', maxIndex ', maxIndex, ', maxAnek', maxAnek)
    
    console.log('pistetaulukko: ', props.pisteet)
    
    indexofmax(props.pisteet)
    console.log('indexofmax jälkeen: maxValue ', maxValue, ', maxIndex ', maxIndex, ', maxAnek', maxAnek)

    //Apufunktio, joka palauttaa eniten ääniä saaneen anekdootin äänimäärän ja indexin
    function indexofmax(arr) {
        if (arr.length === 0) {
            return -1
        }
        let maxVal = -1
        let maxIn = -1
        let current = 0

        arr.forEach(luku => {
            if(luku > maxVal) {
                maxVal = luku 
                maxIn = current
            }
            current += 1
        })
        maxValue = maxVal
        maxIndex = maxIn
    } 
    maxAnek = props.anekdootit[maxIndex]
    console.log('max anekdootti: ', maxAnek)

    return (
        <div>
            <p>{maxAnek}</p>
            <p>{maxValue} pistettä</p>
        </div>
    )
}

const Teenappi = (props) => {
    return (
            <button onClick={props.handler}>{props.text}</button>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'));

