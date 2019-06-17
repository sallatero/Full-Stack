import React from 'react';
import { Form, FormField, Header } from 'semantic-ui-react'

const Rajaa = (props) => {
    return (
      <Form>
        <FormField fluid='true'>
          <Header as='h3'>Rajaa nimiä</Header>
          <input type='text' placeholder='Kirjoita nimen alku' 
            value={props.search} onChange={props.handler} />
        </FormField>
      </Form>
    )
}

export default Rajaa