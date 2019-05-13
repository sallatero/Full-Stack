import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { prettyDOM, findAllByTestId } from 'dom-testing-library'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    title: 'Test title',
    author: 'Test Author',
    url: 'http://localhost:3005',
    likes: 8
  }
  const mockHandlerLike = jest.fn()
  const mockHandlerDel = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} addLike={mockHandlerLike}
        deleteBlog={mockHandlerDel} username='neitonen'/>
    )
  })

  test('trying out thigs', () => {
    //component.debug()
    //console.log(prettyDOM(button))
  })

  test('at start only title and author are displayed', () => {
    const toShow = component.container.querySelector('.defaultBlogView')
    //console.log(prettyDOM(toShow))
    expect(toShow).toBeDefined()

    const notToShow = component.container.querySelector('.showAllBlogView')
    //console.log(prettyDOM(notToShow))
    expect(notToShow).toHaveStyle('display: none')
  })

  test('after clicking blog, all info is displayed', () => {

    const blogRow = component.container.querySelector('.defaultBlogView')
    fireEvent.click(blogRow)

    const all = component.container.querySelector('.showAllBlogView')

    //console.log(prettyDOM(all))
    expect(all).not.toHaveStyle('display: none')

  })

  test('when all info is displayed, clicking blog will hide additional info', () => {

    const blogRow = component.container.querySelector('.defaultBlogView')
    fireEvent.click(blogRow)
    fireEvent.click(blogRow)

    const all = component.container.querySelector('.showAllBlogView')

    expect(all).toHaveStyle('display: none')
  })

})

