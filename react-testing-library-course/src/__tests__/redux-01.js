import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Provider} from 'react-redux'

import {store} from '../redux-store'
import {Counter} from '../redux-counter'

describe('Counter', () => {
  it('should render with redux with default', () => {
    render(
      <Provider store={store}>
        <Counter />
      </Provider>,
    )

    userEvent.click(screen.getByText('+'))
    expect(screen.getByLabelText(/count/)).toHaveTextContent(1)
  })
})
