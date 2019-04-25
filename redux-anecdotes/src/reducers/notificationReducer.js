const notificationAtStart =  'Initial notification'

const initialState = notificationAtStart

export const setNotification = (content, seconds, store) => {
  store.dispatch(setMessage(content))
  setTimeout(() => {
    store.dispatch(reset())
  }, seconds)
}

const setMessage = (content) => {
  return {
    type: 'SET_MSG',
    content
  }
}

const reset = () => {
  return {
    type: 'RESET'
  }
}

const notificationReducer = (state = initialState, action) => {
  //console.log('state now: ', state)
  //console.log('action', action)

  switch (action.type) {
    case 'GET_MSG': {
      return state
    }
    case 'SET_MSG': {
      return action.content
    }
    case 'RESET': {
      return null
    }
    default:
      return state
  } 

}

export default notificationReducer