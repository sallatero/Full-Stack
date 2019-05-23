import React from 'react'

const Books = (props) => {
  console.log('Books props: ', props)

  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }
  console.log('props.result: ', props.result.data.allBooks)
  const books = props.result.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(b =>
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books