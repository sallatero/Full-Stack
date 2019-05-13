import React from 'react'
import LoginForm from './LoginForm'
import Info from './Info'
import LogoutButton from './LogoutButton'
import Home from './Home'
import BlogPage from './BlogPage'
import User from './User'
import UserList from './UserList'
import { connect } from 'react-redux'
import { Container, Menu, Segment } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, withRouter, NavLink } from 'react-router-dom'

const MenuComponent = (props) => {
  const userById = (id) => {
    const user = props.users.find(u => u.id === id)
    return user
  }

  const blogById = (id) => {
    const blog = props.blogs.find(b => b.id === id)
    return blog
  }
  /*
size='mini' color='teal'
*/

  return (
    <Container>
      <div className='app'>
        {props.loggedUser === null ?
          <div>
            <Segment inverted>
              <Menu inverted pointing secondary>
              </Menu>
            </Segment>
            <Info />
            <Container text>
              <Router>
                <LoginForm />
              </Router>
            </Container>
          </div>
          :
          <div>
            <Router>
              <div>
                <Segment inverted>
                  <Menu inverted pointing secondary>
                    <Menu.Item name='home' as={NavLink} exact to='/' content='home' />
                    <Menu.Item name='users' as={NavLink} to='/users' content='users' />
                    <Menu.Menu position='right'>
                      <Menu.Item>
                        <em>{props.loggedUser.name} logged in</em>
                      </Menu.Item>
                      <Menu.Item>
                        <LogoutButton />
                      </Menu.Item>
                    </Menu.Menu>
                  </Menu>
                </Segment>
                <Info />
                <Route exact path="/" render={() =>
                  <Home />
                } />
                <Route exact path="/blogs/:id" render={({ match }) =>
                  <BlogPage blog={blogById(match.params.id)} />
                } />
                <Route exact path="/users" render={() =>
                  <UserList />
                } />
                <Route exact path="/users/:id" render={({ match }) =>
                  <User user={userById(match.params.id)} />
                } />
                <Route path="/login" render={() =>
                  <LoginForm  />
                } />
              </div>
            </Router>
          </div>
        }
      </div>
    </Container>
  )
}
const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    users: state.users,
    blogs: state.blogs
  }
}

export default withRouter(connect(mapStateToProps)(MenuComponent))