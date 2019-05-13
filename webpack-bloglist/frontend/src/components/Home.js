import React from 'react'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import Info from './Info'
import { Container } from 'semantic-ui-react'

const Home = () => {
  return (
    <Container text>
      <h2>Blogs</h2>
      <BlogForm />
      <BlogList />
    </Container>
  )
}
export default Home
