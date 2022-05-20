/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import {render, fireEvent} from '@testing-library/react'

import {HiddenMessage} from '../hidden-message'

jest.mock('react-transition-group', () => {
  return {
    CSSTransition: (props) => (props.in ? props.children : null),
  }
})

test('shows hidden message when toggle is clicked', async () => {
  const myMessage = 'Hello, world!'
  const {getByText, queryByText} = render(
    <HiddenMessage>{myMessage}</HiddenMessage>,
  )

  const toggle = getByText(/toggle/i)

  expect(queryByText(myMessage)).not.toBeInTheDocument()

  fireEvent.click(toggle)
  expect(getByText(myMessage)).toBeInTheDocument()

  fireEvent.click(toggle)
  expect(queryByText(myMessage)).not.toBeInTheDocument()
})
