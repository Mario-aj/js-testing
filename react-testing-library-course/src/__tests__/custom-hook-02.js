import React from 'react'
import {render, act} from '@testing-library/react'

import {useCounter} from '../use-counter'

describe('useCounter', () => {
  it('should exposes the count and increment/decrement function', () => {
    let result
    function HelperComponent() {
      result = useCounter()

      return null
    }

    render(<HelperComponent />)
    expect(result.count).toBe(0)

    act(() => result.increment())
    expect(result.count).toBe(1)

    act(() => result.decrement())
    expect(result.count).toBe(0)
  })

  it('allow customization of the initialState', () => {
    const result = {}
    function HelperComponent() {
      result.current = useCounter({initialCount: 3})

      return null
    }

    render(<HelperComponent />)
    expect(result.current.count).toBe(3)
  })

  it('allow customization of the step', () => {
    let result
    function HelperComponent() {
      result = useCounter({step: 4})

      return null
    }

    render(<HelperComponent />)
    expect(result.count).toBe(0)

    act(() => result.increment())
    expect(result.count).toBe(4)

    act(() => result.decrement())
    expect(result.count).toBe(0)
  })
})
