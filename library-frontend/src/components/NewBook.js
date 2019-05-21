import React, { useState } from 'react'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  if (!props.show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()
    console.log('add book...')
    console.log(title, published, author, born, genres)

    const publInt = parseInt(published)
    const bornInt = parseInt(born)

    await props.mutation({
      variables: { title: title, published: publInt, 
        author: author, born: bornInt, genres: genres }
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setBorn('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    const newGenres = genres.concat(genre)
    console.log('newGenres: ', newGenres)
    setGenres([...newGenres])
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook