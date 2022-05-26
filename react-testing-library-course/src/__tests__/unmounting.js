import React from 'react'
import {act, render} from '@testing-library/react'

import {Countdown} from '../countdown'
beforeAll(() => jest.spyOn(console, 'error').mockImplementation(() => {}))
afterAll(() => console.error.mockRestore())
afterEach(() => {
  jest.clearAllMocks()
  jest.useRealTimers()
})

describe('Countdown', () => {
  it('Does not attempt to set state when unmounted', () => {
    jest.useFakeTimers()
    const {unmount} = render(<Countdown />)

    unmount()
    act(() => jest.runOnlyPendingTimers())
    expect(console.error).not.toHaveBeenCalled()
  })
})
