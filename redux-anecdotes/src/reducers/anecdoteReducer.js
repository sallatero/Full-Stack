/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]*/

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
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