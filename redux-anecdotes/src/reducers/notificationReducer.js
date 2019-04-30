const initialState = null

export const setNotification = (content, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'SET_MSG',
      content
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET'
      })
    }, seconds)
  }
}

const notificationReducer = (state = initialState, action) => {
  console.log('notificationReducer: ', action.type)

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