import React, {useState} from 'react';
//import ReactDOM from 'react-dom';
import Kurssi from './components/Kurssi'

const App = (props) => {
    const kurssit = props.kurssit

    return (
        <div>
            <h1>Opetusohjelma</h1>
            {kurssit.map(kurssi => <Kurssi key={kurssi.id} kurssi={kurssi}/>)}
        </div>
    )

}
export default App
