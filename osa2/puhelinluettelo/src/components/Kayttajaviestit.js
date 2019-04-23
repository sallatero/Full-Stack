import React from 'react';

const Kayttajaviestit = ({message, err}) => {
    const styleOk = {
        margin: 15,
        color: 'green',
        fontSize: 20,
        border: 'solid',
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: '#D0D0D0', 
        borderColor: 'green', 
        padding: 10
    }
    const styleErr = {
        margin: 15,
        color: 'red',
        fontSize: 20,
        border: 'solid',
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: '#D0D0D0', 
        borderColor: 'red', 
        padding: 10
    }

    if (message === '') {
       return null
    }

    return (
        <div style={err ? styleErr : styleOk}>{message}
        </div>
    )
}

export default Kayttajaviestit