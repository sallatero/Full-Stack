import React, { useState } from 'react'
import Select from 'react-select'

const UpdateAuthorForm = (props) => {
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  
  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }
  //muuta value id:ksi
  const authors = props.result.data.allAuthors
  const options = authors.map(a => {
    return { 
     value: a.id.toString(), label: a.name }
    }
  )

  const submit = async (e) => {
    e.preventDefault()
    console.log('updating author')

    const int = parseInt(born)
    console.log('new year: ', int, 'selected: ', selectedOption)
    await props.updateBirthYear({
      variables: { id: selectedOption.value, setBornTo: int }
    })

    setSelectedOption(null)
    setBorn('')
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>Set birth year</h2>
      <form onSubmit={submit}>
        <div>
          <Select 
            value={selectedOption}
            onChange={(selectedOption) => setSelectedOption(selectedOption)} 
            options={options}
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
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default UpdateAuthorForm