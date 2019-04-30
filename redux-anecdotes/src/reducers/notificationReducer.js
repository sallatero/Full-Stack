const initialState = null

/*
export const setNotification = (content, seconds, dispatch) => {
  console.log('setNotification: dispatch = ', dispatch)
  
  dispatch(setMessage(content))
  setTimeout(() => {
    dispatch(reset())
  }, seconds)
}
*/

export const setNotification = (content, seconds) => {
  return async dispatch => {
    dispatch(setMessage(content))
    setTimeout(() => {
      dispatch(reset())
    }, seconds)
  }
}

/*
export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnec = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW',
      data: newAnec
    })
  }
}*/

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