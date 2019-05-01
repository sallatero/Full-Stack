import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  console.log('PROPS: ', props)

  const vote = (anecdote) => {
    console.log('vote: ', anecdote)
    props.voteAnecdote(anecdote)
    props.setNotification(`You voted '${anecdote.content}'`, 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {props.visibleAnecdotes.map(anecdote =>
        <div key={anecdote.id.toString()}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

//Filters and sorts anecdotes for rendering
const anecdotesToShow = ({anecdotes, filter}) => {
  console.log('anecdotesToShow: ', anecdotes, filter)
  //let reg = new RegExp(filter, 'i')
  //const anecdotesToShow = anecdotes.filter(a => reg.test(a.content)).sort((a, b) => b.votes - a.votes)
  const anecdotesToShow = filter.length > 0 ? 
    anecdotes.filter(a => a.content.includes(filter)) :
    anecdotes
  return anecdotesToShow
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    visibleAnecdotes: anecdotesToShow(state) 
  }
}

const mapDispatchToProps = {
  voteAnecdote, 
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
