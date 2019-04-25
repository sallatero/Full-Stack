
export const setFilter = (content) => {
  return {
    type: 'SET_FILTER',
    content
  }
}

const notificationReducer = (state = '', action) => {

  switch (action.type) {
    case 'SET_FILTER': {
      return action.content
    }
    default:
      return state
  } 

}

export default notificationReducer