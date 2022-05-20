import React from 'react'
import {render} from '@testing-library/react'

import {reportError as mockReportError} from '../api'
import {ErrorBoundary} from '../error-boundary'

jest.mock('../api')

afterEach(jest.clearAllMocks)

function Bomb({shoudlThrow}) {
  if (shoudlThrow) {
    throw new Error('Error thrown')
  }
  return null
}

test('render error boundary', () => {
  mockReportError.mockResolvedValueOnce({success: true})
  const {rerender} = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>,
  )

  rerender(
    <ErrorBoundary>
      <Bomb shoudlThrow={true} />
    </ErrorBoundary>,
  )
  const error = expect.any(Error)
  const info = {componentStack: expect.stringContaining('Bomb')}

  expect(mockReportError).toHaveBeenCalledWith(error, info)
  expect(mockReportError).toHaveBeenCalledTimes(1)
})
