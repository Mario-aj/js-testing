import {renderHook, act} from '@testing-library/react-hooks'

import {useCounter} from '../use-counter'

describe('useCounter', () => {
  it('should exposes the count and increment/decrement function', () => {
    const {result} = renderHook(useCounter)
    expect(result.current.count).toBe(0)

    act(() => result.current.increment())
    expect(result.current.count).toBe(1)

    act(() => result.current.decrement())
    expect(result.current.count).toBe(0)
  })

  it('allow customization of the initialState', () => {
    const {result} = renderHook(useCounter, {initialProps: {initialCount: 3}})

    expect(result.current.count).toBe(3)
  })

  it('allow customization of the step', () => {
    const {result} = renderHook(useCounter, {initialProps: {step: 4}})

    expect(result.current.count).toBe(0)

    act(() => result.current.increment())
    expect(result.current.count).toBe(4)

    act(() => result.current.decrement())
    expect(result.current.count).toBe(0)
  })

  it('allow pass differentes step', () => {
    const {result, rerender} = renderHook(useCounter, {initialProps: {step: 4}})

    expect(result.current.count).toBe(0)

    act(() => result.current.increment())
    expect(result.current.count).toBe(4)

    rerender({step: 2})

    act(() => result.current.decrement())
    expect(result.current.count).toBe(2)
  })
})
