import React from 'react';
import { Form, FormField, Header, Button } from 'semantic-ui-react';

const Uusi = (props) => {
    return (
      <Form onSubmit={props.handleSubmit}>
        <Header color='grey' as='h3'>Lisää uusi</Header>
        <Form.Group widths='equal'> 
          <FormField control='input' placeholder='Etunimi ja sukunimi' fluid='true' type='text' value={props.newName} onChange={props.changeName} />           
          <FormField control='input' placeholder='Puhelinnumero' fluid='true' type='text' value={props.newNro} onChange={props.changeNro} />
        </Form.Group>
        <Button fluid type='submit'>Tallenna</Button>
      </Form>
    )
}

export default Uusi