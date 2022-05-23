/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import {render, fireEvent, waitFor} from '@testing-library/react'

import {GreetingLoader} from '../greeting-loader-01-mocking'
import {loadGreeting as mockLoadGreeting} from '../api'

jest.mock('../api')

test('rendera greeting loader', async () => {
  const testGreeting = 'GREETING_TEST'
  mockLoadGreeting.mockResolvedValueOnce({data: {greeting: testGreeting}})

  const {getByLabelText, getByText} = render(<GreetingLoader />)
  const input = getByLabelText(/name/i)
  const button = getByText(/load greeting/i)

  input.value = 'Mary'
  fireEvent.click(button)

  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary')
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
  await waitFor(() =>
    expect(getByLabelText(/greeting/i)).toHaveTextContent(testGreeting),
  )
})
