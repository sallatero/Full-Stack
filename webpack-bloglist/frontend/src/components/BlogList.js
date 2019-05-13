import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const BlogList = (props) => {
  console.log('PROPS: ', props)

  const style = {
    marginTop: 5
  }

  return (
    <div style={style}>
      <Table striped celled>
        <Table.Body>
          {props.blogsToShow.map(b =>
            <Table.Row key={b.id}>
              <Table.Cell>
                <Link to={`/blogs/${b.id}`}>
                  {b.title} by {b.author}
                </Link>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

//Sorts blogs for rendering
const blogsToShow = ({ blogs }) => {
  console.log('blogsToShow: ', blogs)
  const blogsToShow = blogs.sort((a, b) => b.likes - a.likes)
  return blogsToShow
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    blogsToShow: blogsToShow(state)
  }
}

export default connect(mapStateToProps)(BlogList)
