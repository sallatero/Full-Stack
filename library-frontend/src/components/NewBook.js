import React, { useState } from 'react'
import { Container, Header, Button, Form, 
  FormField, Label, Icon, Segment } from 'semantic-ui-react'
import _ from 'lodash'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  if (!props.show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()
    console.log('add book...')
    console.log(title, published, author, genres)

    if (!title) {
      props.handleError({ message: 'Book must have a title'})
      return
    }
    if (!author) {
      props.handleError({ message: 'Book must have an author'})
      return
    }
    if (!published) {
      props.handleError({ message: 'Book must have a publishing year'})
      return
    }

    const publInt = parseInt(published)
    console.log('pubInt', publInt)
    try {
      await props.addBook({
        variables: { title: title, published: publInt, 
          author: author, genres: genres }
      })
    } catch (error) {
      console.log(error)
      props.handleError(error)
    }
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
    console.log('setting page')
    props.setPage()
  }

  const addGenre = () => {
    const newGenres = genres.concat(genre)
    console.log('newGenres: ', newGenres)
    setGenres([...newGenres])
    setGenre('')
  }

  const removeGenre = (genre) => {
    console.log('removing genre ', genre)
    const newArray = genres.filter(g => g !== genre)
    setGenres(newArray)
    setGenre('')
    console.log('genres after removal ', newArray)
  }

  return (
    <Container text>
      <Header size='large' color='teal'>Give book details</Header>
      <Segment inverted tertiary>
      <Form inverted onSubmit={submit}>
        <FormField>
          <label>Title</label>
          <input type='text' value={title} placeholder='Title of book' 
            onChange={({ target }) => setTitle(target.value)}/>
        </FormField>
        <FormField>
          <label>Author</label>
          <input type='text' value={author} placeholder='Author of book' 
            onChange={({ target }) => setAuthor(target.value)}/>
        </FormField>
        <FormField>
          <label>Published</label>
          <input type='number' value={published} placeholder='Publishing year of book' 
            onChange={({ target }) => setPublished(target.value)}/>
        </FormField>
        <FormField>
          <label>Genre</label>
          <Form.Group inline>
            <FormField>
              <input type='text' value={genre} placeholder='Genre of book' 
                onChange={({ target }) => setGenre(target.value)}/>
            </FormField>
            <Button onClick={addGenre} type='button'>add genre</Button>
          </Form.Group>
          <Label.Group color='teal'>
            <div>
              {genres.map(g => (
                <Label key={g} as='a' onClick={() => removeGenre(g)} size='large' horizontal>
                  {_.capitalize(g)}
                  <Icon name='close'/>
                </Label>
              ))}
            </div>
          </Label.Group>
        </FormField>
        <Button type='submit'>Submit</Button>
      </Form>
      </Segment>
    </Container>
  )
}

export default NewBook