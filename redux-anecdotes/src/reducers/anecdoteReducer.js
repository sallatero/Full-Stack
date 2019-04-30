import anecdoteService from '../services/anecdotes'

/*
export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}*/

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW',
    data: { anecdote }
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

//const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (data) => {
  return {
    content: data.content,
    id: data.id,
    votes: 0
  }
}

//const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = [], action) => {
  console.log('anecdoteReducer: ', action.type, action.data)

  switch (action.type) {
    case 'INIT_ANECDOTES': {
      return action.data
    }
    case 'VOTE': {
      const newState = state.map(a => a.id === action.data.id ? {...a, votes: a.votes + 1} : a)
      return newState
    }
    case 'NEW': {
      console.log(action.data.anecdote)
      //const o = asObject(action.data.anecdote)
      //console.log('NEW: ', o)
      const newState = state.concat(action.data.anecdote) 
      return newState
    }
    default:
      return state
  } 

}

export default anecdoteReducer