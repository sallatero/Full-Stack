import loginService from '../services/login'
import { setMessage } from './notificationReducer'

export const initializeUser = () => {
  return dispatch => {
    console.log('initializing logged in user')
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch({
        type: 'SET_USER',
        data: loggedUser
      })
    }
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    const loggedUser = await loginService.login({
      username: username, password: password
    })
    if (loggedUser.statusCode) {
      dispatch(setMessage('Wrong username or password', 5000))
      dispatch({
        type: 'RESET_USER'
      })
      return
    }
    //Lisää käyttäjän tiedot local storageen
    console.log('user: ', loggedUser)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedUser))
    dispatch(setMessage(`Tervetuloa ${loggedUser.name}`, 5000))
    dispatch({
      type: 'SET_USER',
      data: loggedUser
    })
  }
}

export const setUser = (loggedUser) => {
  return dispatch => {
    console.log('setUser: ', loggedUser)
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(loggedUser)
    )
    dispatch(setMessage(`Tervetuloa ${loggedUser.name}`, 5000))
    dispatch({
      type: 'SET_USER',
      data: loggedUser
    })
  }
}

export const logoutUser = () => {
  return dispatch => {
    console.log('logout user: ')
    window.localStorage.clear()
    //blogService.setToken(null)
    dispatch(setMessage('Hei hei!', 5000))
    dispatch({
      type: 'RESET_USER'
    })

  }
}

const loggedUserReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER': {
    return action.data
  }
  case 'RESET_USER': {
    return null
  }
  default:
    return state
  }
}

export default loggedUserReducer