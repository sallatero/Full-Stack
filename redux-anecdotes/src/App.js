import React from 'react';

const App = (props) => {
  const anecdotes = props.store.getState()
  
  const vote = (id) => {
    console.log('vote', id)
    
    props.store.dispatch({
      type: 'VOTE',
      data: {
        id: id
      }
    })
  }
  const addNew = (event) => {
    event.preventDefault()
    const content = event.target.text.value
    props.store.dispatch({
      type: 'NEW',
      data: {
        content
      }
    })
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
