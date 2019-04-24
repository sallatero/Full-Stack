import React from 'react'
import { voteMessage } from '../reducers/notificationReducer'

const Notification = (props) => {
  const style = {
    margin: 15,
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  /*
  const vote = (id) => {
    console.log('vote', id)
    props.store.dispatch(voteMessage(content))
    
  }*/

  return (
    <div style={style}>
      {props.store.getState().notification}
    </div>
  )
}

export default Notification
