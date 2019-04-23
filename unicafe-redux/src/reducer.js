const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD': {
      const n = {...state}
      n.good = state.good + 1
      return n
    }
    case 'OK': {
      const n = {...state}
      n.ok = state.ok + 1
      return n
    } 
    case 'BAD': {
      const n = {...state}
      n.bad = state.bad + 1
      return n
    }
    case 'ZERO': {
      return initialState
    }
    default: return state
  }
  
}

export default counterReducer