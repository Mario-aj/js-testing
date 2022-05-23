import 'whatwg-fetch'
import React from 'react'
import {render, waitFor, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {setupServer} from 'msw/node'
import {rest} from 'msw'

import {GreetingLoader} from '../greeting-loader-01-mocking'

const server = setupServer(
  rest.post('/greeting', (req, res, ctx) => {
    return res(ctx.json({data: {greeting: `Hello ${req.body.subject}`}}))
  }),
)

beforeAll(() => server.listen({onUnhandledRequest: 'error'}))
afterEach(server.resetHandlers)
afterAll(server.close)

test('rendera greeting loader', async () => {
  render(<GreetingLoader />)

  const input = screen.getByLabelText(/name/i)
  const button = screen.getByText(/load greeting/i)

  userEvent.type(input, 'Mary')
  userEvent.click(button)

  await waitFor(() =>
    expect(screen.getByLabelText(/greeting/i)).toHaveTextContent(/hello mary/i),
  )
})
