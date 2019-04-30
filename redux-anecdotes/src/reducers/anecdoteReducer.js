import anecdoteService from '../services/anecdotes'

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnec = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW',
      data: newAnec
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const obj = {...anecdote, votes: anecdote.votes + 1}
    const modifiedAnec = await anecdoteService.modify(anecdote.id, obj)
    dispatch({
      type: 'VOTE',
      data: modifiedAnec
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('anecdoteReducer: ', action.type, action.data)

  switch (action.type) {
    case 'INIT_ANECDOTES': {
      return action.data
    }
    case 'VOTE': {
      const newState = state.map(a => a.id === action.data.id ? action.data : a)
      return newState
    }
    case 'NEW': {
      console.log(action.data)
      const newState = state.concat(action.data) 
      return newState
    }
    default:
      return state
  } 

}

export default anecdoteReducer