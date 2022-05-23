/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import {render, fireEvent} from '@testing-library/react'

import {reportError as mockReportError} from '../api'
import {ErrorBoundary} from '../error-boundary'

jest.mock('../api')

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(jest.clearAllMocks)

afterAll(() => {
  console.error.mockRestore()
})

function Bomb({shoudlThrow}) {
  if (shoudlThrow) {
    throw new Error('Error thrown')
  }
  return null
}

test('render error boundary', () => {
  mockReportError.mockResolvedValueOnce({success: true})
  const {rerender, getByText, queryByRole, getByRole} = render(<Bomb />, {
    wrapper: ErrorBoundary,
  })

  rerender(<Bomb shoudlThrow={true} />)
  const error = expect.any(Error)
  const info = {componentStack: expect.stringContaining('Bomb')}

  expect(mockReportError).toHaveBeenCalledWith(error, info)
  expect(mockReportError).toHaveBeenCalledTimes(1)
  expect(console.error).toHaveBeenCalledTimes(2)
  expect(getByRole('alert').textContent).toMatchInlineSnapshot(
    `"There was a problem."`,
  )

  mockReportError.mockClear()
  console.error.mockClear()

  rerender(<Bomb />)

  const tryAgainButton = getByText(/Try again/i)

  fireEvent.click(tryAgainButton)

  expect(mockReportError).not.toHaveBeenCalled()
  expect(console.error).not.toHaveBeenCalled()
  expect(queryByRole('alert')).not.toBeInTheDocument()
  expect(tryAgainButton).not.toBeInTheDocument()
})
