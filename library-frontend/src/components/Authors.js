import React from 'react'
import { useApolloClient } from 'react-apollo-hooks'
import { Container, Header, Image, Segment, Dimmer, Loader } from 'semantic-ui-react'

const Authors = (props) => {
  //console.log('Authors props: ', props)
  //const client = useApolloClient()

  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return (
      <Segment>
        <Dimmer active inverted>
          <Loader inverted content='Loading'/>
        </Dimmer>
        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png'/>
      </Segment>
    )
  }

  const authors = props.result.data.allAuthors
  return (
    <Container text>
      <Header size='large'>Authors</Header>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
    </Container>
  )
}

export default Authors