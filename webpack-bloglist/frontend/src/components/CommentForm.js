import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { commentBlog } from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'
import { Form, Button, Icon } from 'semantic-ui-react'

//Kun CommentForm luodaan annetan sille blogi, johon se liittyy
const CommentForm = (props) => {
  const [comment, commentReset] = useField('text')

  const commentBlog = (event) => {
    event.preventDefault()
    const commentText = event.target.comment.value
    console.log('adding comment', event.target.comment.value)
    commentReset()
    try {
      if (props.loggedUser) {
        const commentObj = { text: commentText }
        console.log('commentObj: ', commentObj)
        //const newVersion = { ...props.blog, comments: props.blog.comments.concat(commentObj) }
        props.commentBlog(props.blog.id, commentObj, props.loggedUser.token)
      }
    } catch (exception) {
      props.setMessage('Blog commenting unsuccessful!', 5000)
    }
  }

  return (
    <div>
      <Form onSubmit={commentBlog}>
        <Form.Group>
          <Form.Input width='15' placeholder='leave a comment...' name='comment' {...comment} />
          <Button icon labelPosition='left'>
            <Icon name='comment'/>
          Comment</Button>
        </Form.Group>
      </Form>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  commentBlog,
  setMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)