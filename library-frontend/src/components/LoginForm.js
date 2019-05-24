import React, { useState } from 'react'

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
    <div>
      <h2>Login here</h2>
      <form onSubmit={submit}>
        <div>
          username
          <input 
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input 
            type='password'
            value={password}
            onChange={({ target }) => setpassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm