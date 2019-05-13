import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import loggedUserReducer from './reducers/loggedUserReducer'
import userlistReducer from './reducers/userlistReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  loggedUser: loggedUserReducer,
  notification: notificationReducer,
  users: userlistReducer
})

const store = createStore(reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store