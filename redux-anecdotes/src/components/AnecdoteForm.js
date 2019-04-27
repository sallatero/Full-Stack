import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer';
import { createAnecdote } from '../reducers/anecdoteReducer'
import { bindActionCreators } from 'redux'

const AnecdoteForm = (props) => {

  const addAnecdote = (event) => {
    event.preventDefault()
    props.createAnecdote(event.target.text.value)
    console.log('addAnecdote: ', props)
    setNotification(`New anecdote added '${event.target.text.value}'`, 5000, props.dispatch)
    event.target.text.value = ''

    //props.setMessage(`Added: "${content}"`, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name='text'/>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    ...bindActionCreators({createAnecdote}, dispatch)
  }
}

export default connect(
  null, 
  mapDispatchToProps
)(AnecdoteForm)