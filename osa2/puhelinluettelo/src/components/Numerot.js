import React from 'react';
import { Segment, Table, Button, Header, Container } from 'semantic-ui-react';


const Numerot = (props) => {
    console.log('Numerot alussa: ', props.persons);
    console.log('Search: ', props.search);

    //Tehdään uusi taulukko, jossa vain hakua vastaavat nimet
    let reg = new RegExp(props.search, 'i')
    console.log('reg: ', reg);
    let filtered = props.persons.filter(person => reg.test(person.name))
    console.log('filtered: ', filtered);
    
    return (
      <Container fluid textAlign='center' padded='very'>
        <Header color='violet' as='h3'>Numerot</Header>
        <Table sortable color='violet' columns='3' collapsing fluid textAlign='center'>
          <Table.Body>
            {filtered.map(person => <Person key={person.id} person={person} remove={() => props.removeId(person.id)}/>)}
          </Table.Body>
        </Table>
      </Container>
    )
}

const Person = (props) => {
    return (
     <Table.Row>
       <Table.Cell>
        {props.person.name}
       </Table.Cell>
       <Table.Cell>
        {props.person.number}
       </Table.Cell>
       <Table.Cell>
        <Button compact floated='right' onClick={props.remove}>Poista</Button>
       </Table.Cell>
     </Table.Row>
    )
}

export default Numerot