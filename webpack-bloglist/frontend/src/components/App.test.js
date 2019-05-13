import React from 'react'
import { render, waitForElement, act } from 'react-testing-library'
jest.mock('../services/blogs') //Siirrä testsetupiin
import App from '../App'
import { fireEvent } from 'react-testing-library/dist'
import { prettyDOM } from 'dom-testing-library'

describe('<App />', () => {
  test('renders only login form, when user is not logged in', async () => {
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )
    const loginButton = component.getByText('login')
    fireEvent.click(loginButton)

    await waitForElement(
      () => component.getByText('Kirjaudu sisään')
    )
    //Sivulla näkyy login form
    const div = component.container.querySelector('.loginForm')
    expect(div).toBeDefined()
    //Sivulla ei näy blogeja
    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)

  })

  test('renders all blogs it gets from backend, when user is logged in', async () => {
    //Luodaan testikäyttäjä ja logataan sisään
    const user = {
      username: 'tester',
      token: '123124145521',
      name: 'Teuvo Testaaja'
    }
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(<App />)
    component.rerender(<App />)

    const app = component.container.querySelector('.app')

    await waitForElement(
      () => component.container.querySelector('.blog')
    )
    const blogs = component.container.querySelectorAll('.blog')

    //console.log(prettyDOM(blogs))

    expect(blogs.length).toBe(3)
    expect(component.container).toHaveTextContent(
      'Annin uunissa'
    )
    expect(component.container).toHaveTextContent(
      'Cakes for Salla'
    )
    expect(component.container).toHaveTextContent(
      'Cakes for all'
    )
  })
})