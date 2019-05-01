import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    event.persist() //so that input field can be emptied
    console.log('addAnecdote: ', event, props)
    const content = event.target.text.value
    event.target.text.value = ''
    props.createAnecdote(content)
    props.setNotification(`New anecdote added '${content}'`, 5000)
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

const mapDispatchToProps = {
  createAnecdote, 
  setNotification
}

export default connect(
  null, 
  mapDispatchToProps
)(AnecdoteForm)