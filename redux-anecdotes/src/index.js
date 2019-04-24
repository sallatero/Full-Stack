import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import App from './App'
import anecdoteReducer, { voteAnecdote } from './reducers/anecdoteReducer'
import notificationReducer, { setMessage } from './reducers/notificationReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer
})

const store = createStore(reducer)

console.log(store.getState())

const render = () => {
  ReactDOM.render(
    <div></div>,
    document.getElementById('root')
  )
}
/*
const render = () => {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
  )
}
*/

render()
//store.subscribe(render)
store.subscribe(() => console.log(store.getState()))
store.dispatch(setMessage('oma teksti'))
store.dispatch(voteAnecdote('2'))