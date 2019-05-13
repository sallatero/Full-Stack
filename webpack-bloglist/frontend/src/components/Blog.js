import React, { useState } from 'react'
import { connect } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'

const Blog = (props) => {
  const [showAll, setShowAll] = useState(false)
  let deletable = true
  if (props.loggedUser === null) {
    deletable = false
  } else if (props.blog.user) {
    deletable = props.blog.user.username === props.loggedUser.username
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = (blog) => {
    props.likeBlog(blog, props.loggedUser.token)
  }
  const deleteBlog = (blog) => {
    props.deleteBlog(blog, props.loggedUser.token)
  }

  //showAllInfo: näytetään kun blogi on "avattu"
  const showAllInfo = { display: showAll ? '' : 'none' }
  //ableToDelete: blogin delete-nappula näkyy vain blogin lisänneelle käyttäjälle
  const ableToDelete = { display: deletable ? '' : 'none' }

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div onClick={toggleShowAll} className='defaultBlogView'>
        {props.blog.title} {props.blog.author}
      </div>
      <div style={showAllInfo} className='showAllBlogView'>
        <p>{props.blog.url}</p>
        <p>{props.blog.likes} likes <button onClick={() => addLike(props.blog)}>like</button></p>
        <p>added by {props.blog.user ? props.blog.user.name : ''}</p>
        <div style={ableToDelete}>
          <p><button onClick={() => deleteBlog(props.blog)}>delete</button></p>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  //console.log(state)
  return {
    loggedUser: state.loggedUser
  }
}

const mapDispatchToProps = {
  likeBlog, deleteBlog,
  setMessage
}
export default connect(mapStateToProps, mapDispatchToProps)(Blog)