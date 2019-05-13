import loginService from '../services/login'
import userService from '../services/users'
import { setMessage } from '../reducers/notificationReducer'

/* HALUTAANKO TEHDÄ TÄSTÄ TOIMINNALLISUUTTA? JOS LISÄÄ VAIN RESTILLÄ
export const createUser = (username, name, password) => {
  return async dispatch => {
    const newUser = await userService.create(user)
    dispatch(setMessage(`New user added '${user.username}`, 5000))
    dispatch({
      type: 'NEW_USER',
      data: newUser
    })
  }
}
*/
/*
username:
name:
passwordHash:
blogs: []
*/

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

const userlistReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERS': {
    return action.data
  }
  default:
    return state
  }
}

export default userlistReducer