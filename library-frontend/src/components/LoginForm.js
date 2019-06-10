import React, { useState } from 'react'
import { Container, Header, Segment, Form, FormField, Button } from 'semantic-ui-react'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setpassword] = useState('')

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    try {
      const result = await props.login({
        variables: { username, password }
      })
      const token = result.data.login.value

      props.setToken(token)
      localStorage.setItem('library-user-token', token)
      props.setPage()
    } catch (error) {
      props.handleError(error)
    }
  }

  return (
    <Container text>
      <Segment.Group>
        <Segment padded>
          <Header size='large' color='teal'>Login here</Header>
        </Segment>
        <Segment.Group>
          <Segment padded stacked>
            <Form onSubmit={submit}>
              <FormField fluid='true'>
                <label>Username</label>
                <input type='text' value={username} placeholder='Your username' 
                  onChange={({ target }) => setUsername(target.value)}/>
              </FormField>
              <FormField fluid='true'>
                <label>Password</label>
                <input type='password' value={password} placeholder='Your password' 
                  onChange={({ target }) => setpassword(target.value)}/>
              </FormField>
              <Button fluid color='teal' type='submit'>Login</Button>
            </Form>
          </Segment>
        </Segment.Group>
      </Segment.Group>
    </Container>
  )
}

export default LoginForm