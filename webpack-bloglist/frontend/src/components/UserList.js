import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Table } from 'semantic-ui-react'

/*
const UserListItem = ({ user }) => {
  return (
    <tr><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>
  )
}
*/

const UserList = (props) => {

  const style = {
    marginTop: 50
  }

  return (
    <Container text>
      <h2>Users</h2>
      <div style={style}>
        <Table striped celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>User</Table.HeaderCell>
              <Table.HeaderCell>Blogs added</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {props.users.map(u =>
              <Table.Row key={u.id}>
                <Table.Cell>
                  <Link to={`/users/${u.id}`}>
                    {u.name}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  {u.blogs.length}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </Container>
  )
}

/*
 <table><tbody>
        <tr><th></th><th>blogs created</th></tr>
        {props.users.map(u =>
          <UserListItem key={u.id} user={u} />
        )}
      </tbody></table>

*/

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(UserList)