import React, { useEffect } from 'react'
import MenuComponent from './components/MenuComponent'
import Footer from './components/Footer'
import { setMessage } from './reducers/notificationReducer'
import { initializeBlogs, likeBlog, deleteBlog } from './reducers/blogReducer'
import { connect } from 'react-redux'
import { initializeUser, setUser, loginUser, logoutUser } from './reducers/loggedUserReducer'
import { initializeUsers } from './reducers/userlistReducer'
import { BrowserRouter as Router } from 'react-router-dom'

const App = (props) => {
  console.log('app alkoi')
  //Haetaan kirjautuneen käyttäjän tiedot ekalla latauksella,  console.log('initializing logged in user')
  useEffect(() => {
    props.initializeUser()
  }, [])

  //Haetaan kannasta blogit, console.log('initializing blogs')
  useEffect(() => {
    props.initializeBlogs()
  }, [])

  //Haetaan kannasta käyttäjät,  console.log('initializing all users')
  useEffect(() => {
    props.initializeUsers()
  }, [])



  /*
  const padding = { padding: 5 }
  <NavLink style={padding} exact to="/" activeClassName="selected">home</NavLink>
  <NavLink style={padding} to="/users" activeClassName="selected">users</NavLink>

  active={activeItem === 'home'} onClick={handleItemClick}
  active={activeItem === 'users'} onClick={handleItemClick}
*/
  /*
  let activeItem = 'home'
  const handleItemClick = (e, { name }) => {
    console.log('handleItemClick ', activeItem, '->', name)
    activeItem = name
    console.log('activeItem after', activeItem)
  }
*/
  return (
    <Router>
      <MenuComponent />
      <Footer />
    </Router>
  )
}

const mapDispatchToProps = {
  initializeUser,
  initializeBlogs,
  initializeUsers
}
export default connect(null, mapDispatchToProps)(App)