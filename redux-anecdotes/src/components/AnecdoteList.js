import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { bindActionCreators } from 'redux'

const AnecdoteList = (props) => {

  let reg = new RegExp(props.filter, 'i')
  let anecdotes = props.anecdotes.filter(a => reg.test(a.content))

  const vote = (id, content) => {
    console.log('vote: id: ',id, 'props: ', props)
    props.voteAnecdote(id)
    //Notificationille tietoa
    setNotification(`You voted '${content}'`, 5000, props.dispatch)
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

const mapStateToProps = (state) => {
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    ...bindActionCreators({voteAnecdote}, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
