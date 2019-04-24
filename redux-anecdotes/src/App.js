import React from 'react'
import { createAnecdote, voteAnecdote } from './reducers/anecdoteReducer'

const App = (props) => {
  const anecdotes = props.store.getState()
  
  const vote = (id) => {
    console.log('vote', id)
    props.store.dispatch(voteAnecdote(id))
  }

  const addNew = (event) => {
    event.preventDefault()
    props.store.dispatch(createAnecdote(event.target.text.value))
    event.target.text.value = ''
  }
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <input name='text'/>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App
