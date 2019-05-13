import blogService from '../services/blogs'
import { setMessage } from '../reducers/notificationReducer'

/* STATE for blogs:
data: array of blogs
*/

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blog, token) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog, token)
    dispatch(setMessage(`New blog added '${blog.title}`, 5000))
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}
export const deleteBlog = (blog, token) => {
  return async dispatch => {
    try {
      const response = await blogService.remove(blog.id, token)
      //Tarkistetaan oikeudet poistoon
      if (response === 401) {
        dispatch(setMessage('Unauthorized action.', 5000))
        dispatch({
          type: 'RESET_USER'
        })
        return
      }
      dispatch(setMessage(`Blog ${blog.title} deleted`, 5000))
      dispatch({
        type: 'DELETE_BLOG',
        data: { id: blog.id }
      })
    }catch (exception) {
      console.log('EXCEPTION: poistaminen ei onnistunut, ', exception)
    }
  }
}

export const likeBlog = (blog, token) => {
  return async dispatch => {
    const obj = { ...blog, likes: blog.likes + 1 }
    console.log('LIKE BLOG: ', blog)
    try {
      const modifiedBlog = await blogService.update(blog.id, obj, token)
      console.log('Modified blog: ', modifiedBlog)
      //Jos unauthorized: errorTitle: "expired token", statusCode: 401
      if (modifiedBlog === 401) {
        dispatch(setMessage('Unauthorized action.', 5000))
        //Ohjataan loginiin
        dispatch({
          type: 'RESET_USER'
        })
        return
      }
      dispatch(setMessage(`You liked blog ${blog.title}`, 5000))
      dispatch({
        type: 'LIKE_BLOG',
        data: modifiedBlog
      })
      //setBlogs(blogs.map(b => b.id !== id ? b : newVersion))
    }catch (exception) {
      console.log('EXCEPTION: likettäminen ei onnistunut, ', exception)
    }
  }
}

export const commentBlog = (id, commentObj, token) => {
  return async dispatch => {
    try {
      const modifiedBlog = await blogService.addComment(id, commentObj, token)
      console.log('modifiedBlog: ', modifiedBlog)
      //Jos unauthorized: errorTitle: "expired token", statusCode: 401
      if (modifiedBlog === 401) {
        dispatch(setMessage('Unauthorized action.', 5000))
        //Ohjataan loginiin
        dispatch({
          type: 'RESET_USER'
        })
        return
      }
      dispatch(setMessage(`You added a comment to ${modifiedBlog.title}`, 5000))
      dispatch({
        type: 'COMMENT_BLOG',
        data: modifiedBlog
      })
      //setBlogs(blogs.map(b => b.id !== id ? b : newVersion))
    }catch (exception) {
      console.log('EXCEPTION: kommentointi ei onnistunut, ', exception)
    }
  }
}

const blogReducer = (state = [], action) => {
  console.log('blogReducer: ', action.type, action.data)

  switch (action.type) {
  case 'INIT_BLOGS' : {
    return action.data
  }
  case 'NEW_BLOG' : {
    const newState = state.concat(action.data)
    return newState
  }
  case 'LIKE_BLOG' : {
    const newState = state.map(b => b.id === action.data.id ? action.data : b)
    return newState
  }
  case 'COMMENT_BLOG' : {
    const newState = state.map(b => b.id === action.data.id ? action.data : b)
    return newState
  }
  case 'DELETE_BLOG' : {
    const newState = state.filter(b => b.id !== action.data.id)
    return newState
  }
  default:
    return state
  }
}

export default blogReducer