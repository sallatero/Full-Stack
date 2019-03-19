import React from 'react';

const Uusi = (props) => {
    return (
      <div>
        <form onSubmit={props.handleSubmit}>
          <div>
            nimi: <input type="text" value={props.newName} onChange={props.changeName}/>
            numero: <input type="text" value={props.newNro} onChange={props.changeNro}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
      </div>
    )
}

export default Uusi