import React from 'react'
import {render, act} from '@testing-library/react'

import {useCounter} from '../use-counter'

function setup({initialProps} = {}) {
  const result = {}
  function HelperComponent(initialState) {
    result.current = useCounter(initialState)
    return null
  }

  render(<HelperComponent {...initialProps} />)

  return result
}

describe('useCounter', () => {
  it('should exposes the count and increment/decrement function', () => {
    const result = setup()
    expect(result.current.count).toBe(0)

    act(() => result.current.increment())
    expect(result.current.count).toBe(1)

    act(() => result.current.decrement())
    expect(result.current.count).toBe(0)
  })

  it('allow customization of the initialState', () => {
    const result = setup({initialProps: {initialCount: 3}})

    expect(result.current.count).toBe(3)
  })

  it('allow customization of the step', () => {
    const result = setup({initialProps: {step: 4}})

    expect(result.current.count).toBe(0)

    act(() => result.current.increment())
    expect(result.current.count).toBe(4)

    act(() => result.current.decrement())
    expect(result.current.count).toBe(0)
  })
})
