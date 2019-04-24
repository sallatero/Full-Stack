const notificationAtStart =  'Initial notification'

const initialState = notificationAtStart

const notificationReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'GET_MSG': {
      return state
    }
    default:
      return state
  } 

}

export default notificationReducer