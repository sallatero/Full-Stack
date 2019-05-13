import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'
import Togglable from '../components/Togglable'
import { Form, FormField, Button, Icon } from 'semantic-ui-react'

const BlogForm = (props) => {
  const [title, titleReset] = useField('text')
  const [author, authorReset] = useField('text')
  const [url, urlReset] = useField('text')
  const [likes, likesReset] = useField('number')

  //Ref blogiformiin
  const blogFormRef = React.createRef()

  const addBlog = (event) => {
    event.preventDefault()
    console.log('adding a new blog', event.target.title.value)

    const blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: event.target.likes.value
    }
    console.log('BlogForm blogi: ', blog)
    titleReset()
    authorReset()
    urlReset()
    likesReset()
    try {
      if (props.loggedUser) {
        props.createBlog(blog, props.loggedUser.token)
        blogFormRef.current.toggleVisibility()
      }
    } catch (exception) {
      props.setMessage('Blog add unsuccessful!', 5000)
    }
  }

  return (
    <Togglable buttonLabel='add blog' ref={blogFormRef}>
      <div>
        <h3>Give blog details</h3>
        <Form onSubmit={addBlog}>
          <FormField>
            <label>Title</label>
            <input name='title' {...title} />
          </FormField>
          <FormField>
            <label>Author</label>
            <input name='author' {...author} />
          </FormField>
          <FormField>
            <label>Url</label>
            <input name='url' {...url} />
          </FormField>
          <FormField>
            <label>Likes</label>
            <input name='likes' {...likes} />
          </FormField>
          <Button primary type="submit" icon labelPosition='left'>
            <Icon name='save'/>Save</Button>

          <Button type="reset" onClick={() => blogFormRef.current.toggleVisibility()}>
            <Icon name='undo'/>Cancel</Button>
        </Form>
      </div>
    </Togglable>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser
  }
}

const mapDispatchToProps = {
  createBlog,
  setMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogForm)