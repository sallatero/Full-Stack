import React from 'react';

const Rajaa = (props) => {
    return (
        <div>
        rajaa näytettäviä: <input type="text" value={props.search} onChange={props.handler}/>
        </div>
    )
}

export default Rajaa