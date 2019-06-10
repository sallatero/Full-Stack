import React, { useState } from 'react'
import Select from 'react-select'
import { Form, Header, FormField, Loader, Button } from 'semantic-ui-react'

const UpdateAuthorForm = (props) => {
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)

  if (props.result.loading) {
    return (
      <Loader active inline='centered' />
    )
  }
  console.log('FORM props: ', props.result.data)
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
    const aut = authors.find(a => { 
      return a.id === selectedOption.value 
    })
    console.log('aut.bookCount: ', aut.bookCount)
    try {
      await props.updateBirthYear({
        variables: { id: selectedOption.value, setBornTo: int, bookCount: aut.bookCount }
      })
      setSelectedOption(null)
      setBorn('')
    } catch (error) {
      console.log(error)
      props.handleError(error)
    }
  }

  if (props.result.loading) {
    return (
      <Loader active inline='centered' />
    )
  }

  return (
    <div>
      <Header size='medium' color='teal'>Set birth year</Header>
      <Form onSubmit={submit}>
        <FormField fluid='true'>
          <label>Author</label>
          <Select 
            value={selectedOption}
            onChange={(selectedOption) => setSelectedOption(selectedOption)} 
            options={options}
          />
        </FormField>
        <FormField fluid='true'>
          <label>Born</label>
          <input type='number' value={born} placeholder='Author birth year' 
            onChange={({ target }) => setBorn(target.value)}/>
        </FormField>
        <Button fluid color='teal' type='submit'>Submit</Button>
      </Form>
    </div>
  )
}

export default UpdateAuthorForm