import React from 'react'
import { useMutation } from 'react-apollo-hooks'
import UPDATE_AUTHOR_BORN from '../graphql/mutations/updateAuthorBorn'
import ALL_AUTHORS from '../graphql/queries/allAuthors'
import UpdateAuthorForm from './UpdateAuthorForm'
import { Container, Header, Segment, Loader, Table } from 'semantic-ui-react'

const Authors = (props) => {
  console.log('Authors props: ', props)

  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return (
      <Loader active inline='centered' />
    )
  }

  const updateBirthYear = useMutation(UPDATE_AUTHOR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const authors = props.result.data.allAuthors
  return (
    <Container text>
      <Segment.Group>
        <Segment padded>
          <Header size='large' color='teal'>Authors</Header>
        </Segment>
        <Segment.Group>
          {props.token     
          ? <Segment padded stacked>
              <UpdateAuthorForm result={props.result} updateBirthYear={updateBirthYear}
                handleError={props.handleError}
              />
            </Segment>
          : <div/>
          }
          <Segment padded>
            <Table color='teal' compact>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Born</Table.HeaderCell>
                  <Table.HeaderCell>Nr. of books</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {authors.map(a =>
                  <Table.Row key={a.name}>
                    <Table.Cell>{a.name}</Table.Cell>
                    <Table.Cell>{a.born}</Table.Cell>
                    <Table.Cell>{a.bookCount}</Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </Segment>
        </Segment.Group>
      </Segment.Group>
    </Container>
  )
}

export default Authors