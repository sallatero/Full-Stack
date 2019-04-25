import React from 'react'
import { setNotification } from '../reducers/notificationReducer';
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    props.store.dispatch(createAnecdote(event.target.text.value))
    setNotification(`New anecdote added '${event.target.text.value}'`, 5000, props.store)
    event.target.text.value = ''
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

export default AnecdoteForm