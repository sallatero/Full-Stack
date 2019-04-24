const notificationAtStart =  'Initial notification'

const initialState = notificationAtStart

/*
const reset = () => {
  setTimeout(() => {
    setMessage('')
  }, 3000)

  return {
    type: 'REMOVE'
  }
}
*/
export const setMessage = (content) => {
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
      return ''
    }
    default:
      return state
  } 

}

export default notificationReducer