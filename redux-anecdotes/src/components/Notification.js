import React from 'react'

const Notification = (props) => {
  let style = {
    margin: 15,
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  /*
  if (props.store.getState().notification === null) {
    style.display = 'none'
  }
  */

 return (
  <div style={style}>
    Kovakoodattu teksti
  </div>
)
/*
  return (
    <div style={style}>
      {props.store.getState().notification}
    </div>
  ) */
}

export default Notification
