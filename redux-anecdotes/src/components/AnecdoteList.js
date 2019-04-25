import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  let reg = new RegExp(props.store.getState().filter, 'i')
  let anecdotes = props.store.getState().anecdotes.filter(a => reg.test(a.content))

  /*
//Tehdään uusi taulukko, jossa vain hakua vastaavat nimet
let reg = new RegExp(props.search, 'i')
console.log('reg: ', reg)
let filtered = props.persons.filter(person => reg.test(person.name))
console.log('filtered: ', filtered)
*/

  const vote = (id, content) => {
    props.store.dispatch(voteAnecdote(id))
    //Notificationille tietoa
    setNotification(`You voted '${content}'`, 5000, props.store)
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
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList