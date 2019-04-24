/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]*/

const anecdotesAtStart = [
  { content: 'If it hurts, do it more often', id: '1', votes: 0 },
  { content: 'Adding manpower to a late software project makes it later!', id: '2', votes: 0 },
  { content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', id: '3', votes: 0 },
  { content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', id: '4', votes: 0 },
  { content: 'Premature optimization is the root of all evil.', id: '5', votes: 0 },
  { content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', id: '6', votes: 0 },
]

export const createAnecdote = (content) => {
  return {
    type: 'NEW',
    data: { content }
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

//const initialState = anecdotesAtStart.map(asObject)
const initialState = anecdotesAtStart

const anecdoteReducer = (state = initialState, action) => {
  //console.log('state now: ', state)
  //console.log('action', action)


  switch (action.type) {
    case 'VOTE': {
      const newState = state.map(a => a.id === action.data.id ? {...a, votes: a.votes + 1} : a)
      return newState
    }
    case 'NEW': {
      const newState = state.concat(asObject(action.data.content)) 
      return newState
    }
    default:
      return state
  } 

}

export default anecdoteReducer