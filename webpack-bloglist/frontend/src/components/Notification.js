import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = (props) => {
  let style = {
    margin: 15,
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (props.notification === '' || props.notification === null) {
    style.display = 'none'
  }

  return (
    /*
    <div style={style}>
      {props.notification}
    </div> */
    <div>
      {props.notification === '' || props.notification === null ?
        <div/>
        :
        <Message success>
          {props.notification}
        </Message>
      }
    </div>  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)