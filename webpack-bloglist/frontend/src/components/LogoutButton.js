import React from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../reducers/loggedUserReducer'
import { setMessage } from '../reducers/notificationReducer'
import { Button, Icon } from 'semantic-ui-react'

const LogoutButton = (props) => {

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out user')
    try {
      props.logoutUser()
    } catch(exception) {
      props.setMessage('uloskirjaus ei onnistunut')
    }
  }

  return (
    <Button icon labelPosition='left' floated='right' onClick={handleLogout}>
      <Icon name='sign-out'/>
Logout</Button>
  )
}
const mapDispatchToProps = {
  logoutUser, setMessage
}
export default connect(null, mapDispatchToProps)(LogoutButton)