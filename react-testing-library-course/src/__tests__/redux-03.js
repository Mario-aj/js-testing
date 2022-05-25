import React from 'react'
import {render as rtlRender, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import {Counter} from '../redux-counter'
import {reducer} from '../redux-reducer'

function render(
  ui,
  {
    initialState,
    store = createStore(reducer, initialState),
    ...rtlOptions
  } = {},
) {
  return rtlRender(<Provider store={store}>{ui}</Provider>, {rtlOptions})
}

describe('Counter', () => {
  it('should render with redux with default', () => {
    render(<Counter />)

    userEvent.click(screen.getByText('+'))
    expect(screen.getByLabelText(/count/)).toHaveTextContent(1)
  })

  it('should render with redux with custom intial state', () => {
    render(<Counter />, {initialState: {count: 3}})

    userEvent.click(screen.getByText('-'))
    expect(screen.getByLabelText(/count/)).toHaveTextContent(2)
  })
})
