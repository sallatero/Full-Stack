import React from 'react'
import { Container, List, Divider, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

//käyttäjän lisäämät blogit
const User = ({ user }) => {
  if (user === undefined) {
    return null
  }

  //Tee samalla tavalla kuin PlogPage, eli
  // horizontal viivat/otsikot
  //Yhtenäistä otsikot koko appissa
  return (
    <Container text>
      <h2>{user.name}</h2>
      <Divider horizontal>
        <Header as='h3'>
          added blogs
        </Header>
      </Divider>
      <List>
        {user.blogs.map(b =>
          <List.Item key={b.id}>
            <Link key={b.id} to={`/blogs/${b.id}`}>{b.title}</Link>
          </List.Item>
        )}
      </List>
    </Container>
  )
}

export default User