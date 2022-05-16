import React from 'react'
import {fireEvent, render} from '@testing-library/react'

import Calculator from '../calculator'

test('renders', () => {
  const {getByText} = render(<Calculator />)
  const clearButton = getByText('AC')

  fireEvent.click(getByText(/3/))
  expect(clearButton).toHaveTextContent('C')

  fireEvent.click(clearButton)
  expect(clearButton).toHaveTextContent('A')
})
