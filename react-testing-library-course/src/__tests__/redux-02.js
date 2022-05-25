import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import {store as appStore} from '../redux-store'
import {Counter} from '../redux-counter'
import {reducer} from '../redux-reducer'

describe('Counter', () => {
  it('should render with redux with default', () => {
    render(
      <Provider store={appStore}>
        <Counter />
      </Provider>,
    )

    userEvent.click(screen.getByText('+'))
    expect(screen.getByLabelText(/count/)).toHaveTextContent(1)
  })

  it('should render with redux with custom intial state', () => {
    const store = createStore(reducer, {count: 3})
    render(
      <Provider store={store}>
        <Counter />
      </Provider>,
    )

    userEvent.click(screen.getByText('-'))
    expect(screen.getByLabelText(/count/)).toHaveTextContent(2)
  })
})
