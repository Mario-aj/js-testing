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
})
