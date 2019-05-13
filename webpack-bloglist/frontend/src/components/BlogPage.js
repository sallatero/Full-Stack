import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'
import { withRouter } from 'react-router-dom'
import CommentForm from './CommentForm'
import { Divider, Header, Table, Button, List, ListContent, Icon, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const BlogPage = (props) => {
  if (props.blog === undefined) {
    return null
  }

  let deletable = true
  if (props.loggedUser === null) {
    deletable = false
  } else if (props.blog.user) {
    deletable = props.blog.user.username === props.loggedUser.username
  }

  const addLike = (blog) => {
    props.likeBlog(blog, props.loggedUser.token)
  }
  const deleteBlog = (blog) => {
    props.deleteBlog(blog, props.loggedUser.token)
    props.history.push('/')
  }

  return (
    <Container text>
      <Divider horizontal>
        <Header as='h3'>
          {props.blog.title} by {props.blog.author}
        </Header>
      </Divider>
      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={3}>Title</Table.Cell>
            <Table.Cell>{props.blog.title}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Author</Table.Cell>
            <Table.Cell>{props.blog.author}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Url</Table.Cell>
            <Table.Cell>
              <Link to={props.blog.url}>{props.blog.url}</Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Likes</Table.Cell>
            <Table.Cell>
              {props.blog.likes} </Table.Cell>
            <Table.Cell>
              <Button icon labelPosition='left' floated='right' onClick={() => addLike(props.blog)}>
                <Icon name='like'/>
          Like</Button>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Added by</Table.Cell>
            <Table.Cell>
              {props.blog.user ?
                <Link to={`/users/${props.blog.user.id}`}>{props.blog.user.name}</Link>
                : <em>unknown</em> }
            </Table.Cell>
            <Table.Cell>
              {deletable ?
                <Button icon labelPosition='left' floated='right' onClick={() => deleteBlog(props.blog)}>
                  <Icon name='delete'/>
          Delete</Button>
                :
                <Button icon labelPosition='left' floated='right' disabled>
                  <Icon name='delete'/>
          Delete</Button>
              }
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Divider horizontal>
        <Header as='h3'>
      Comments
        </Header>
      </Divider>
      <CommentForm blog={props.blog}/>
      <List>
        {props.blog.comments.map(c =>
          <List.Item key={c.id}>
            <ListContent>{c.text}</ListContent>
          </List.Item>
        )}
      </List>
    </Container>
  )
}
/*
<Button size='mini' floated='right' onClick={() => addLike(props.blog)}>like</Button>
<Button size='mini' floated='right' onClick={() => deleteBlog(props.blog)}>delete</Button>
<Button size='mini' floated='right' disabled>delete</Button>

const blogDetails = () => {
  return (

  )
}

const blogComments = () => {
  return (

  )
}
*/
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlogPage))