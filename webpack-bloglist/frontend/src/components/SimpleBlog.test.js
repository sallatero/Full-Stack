import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { prettyDOM } from 'dom-testing-library'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const blog = {
    title: 'Test title',
    author: 'Test Author',
    likes: 8
  }
  const mockHandler = jest.fn()

  const component = render(<SimpleBlog blog={blog} onClick={mockHandler} />)
  expect(component.container).toHaveTextContent('Test title')
  expect(component.container).toHaveTextContent('Test Author')
  expect(component.container).toHaveTextContent('8 likes')
})

test('trying out things', () => {
  const blog = {
    title: 'Test title',
    author: 'Test Author',
    likes: 8
  }
  const mockHandler = jest.fn()

  const component = render(<SimpleBlog blog={blog} onClick={mockHandler} />)

  const button = component.container.querySelector('button')
  //console.log(prettyDOM(button))

})

test('clicking button calls event handler', async () => {
  const blog = {
    title: 'Test title',
    author: 'Test Author',
    likes: 8
  }
  const mockHandler = jest.fn()

  const { getByText } = render(<SimpleBlog blog={blog} onClick={mockHandler} />)

  //Haetaan html:stä like-nappula
  const button = getByText('like')
  //Painetaan nappulaa
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})