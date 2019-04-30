import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer';
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'
import { bindActionCreators } from 'redux'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    event.persist() //so that input field can be emptied
    console.log('addAnecdote: ', event, props)
    const newAnec = await anecdoteService.createNew(event.target.text.value)
    console.log('newAnec: ', newAnec)
    props.createAnecdote(newAnec)
    
    setNotification(`New anecdote added '${newAnec.content}'`, 5000, props.dispatch)
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