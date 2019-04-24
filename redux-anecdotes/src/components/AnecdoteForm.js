import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    props.store.dispatch(createAnecdote(event.target.text.value))
    event.target.text.value = ''
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name='text'/>
      <button type='submit'>create</button>
    </form>
  )
}

export default AnecdoteForm