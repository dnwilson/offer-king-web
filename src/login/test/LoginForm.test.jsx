import React, { useState } from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import LoginForm from '../LoginForm'
import { AppContext } from '../../AppContext'

const email = "valrie.palmer@gmail.com"
const password = "Laurel Allen"
let response = {
  email: email, first_name: "Valrie", last_name: "Palmer", birthdate: "1945-12-26", gender: "female"
}
const offers = [
  {
    id: 1,
    description: "Hello World!",
    image: "https://loremflickr.com/600/350/sale?random=1"
  }
]

const server = setupServer(
  rest.post('http://localhost:3000/api/v1/login', (req, res, ctx) => {
    return res(ctx.json(response))
  }),
  rest.get('http://localhost:3000/api/v1/offers', (req, res, ctx) => {
    return res(ctx.json(offers))
  }),
)
const context = { currentUser: {}, setCurrentUser: () =>  {} }

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('LoginForm', () => {
  it('renders without errors', () => {
    const { getByText, getByLabelText } = render(
      <AppContext.Provider value={context}>
        <LoginForm />
      </AppContext.Provider>
    )
    
    expect(getByText('Login')).toBeInTheDocument()
    expect(getByLabelText('Email')).toBeInTheDocument()
    expect(getByLabelText('Password')).toBeInTheDocument()
  })

  it('handles valid user input and form submission', () => {
    const { getByLabelText, getByText } = render(
      <AppContext.Provider value={context}>
        <LoginForm />
      </AppContext.Provider>
    )
    const emailInput = getByLabelText('Email')
    const passwordInput = getByLabelText('Password')
    const loginButton = getByText('Login')

    // Simulate user input
    fireEvent.change(emailInput, { target: { value: email } })
    fireEvent.change(passwordInput, { target: { value: password } })

    // Check if input values are updated
    expect(emailInput.value).toBe(email)
    expect(passwordInput.value).toBe(password)

    // Simulate form submission
    fireEvent.click(loginButton)

    // Add your login form submission logic and assertions here
    // expect(getByText('Hello World')).toBeInTheDocument()
  })
})