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

const Footer = (props) => {

  const style = {
    margin: 10,
    padding: 5
  }
  const style2 = {
    marginTop: 100
  }

  return (
    <div style={style2}>
      <Container>
        <Segment inverted>
          <div style={style}>
            Blog listing app by <em>Salla Tero</em>
          </div>
        </Segment>
      </Container>
    </div>
  )
}

export default Footer