/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import {render} from '@testing-library/react'

import {FavoriteNumber} from '../favorite-number'

test('renders a number with a label "Favorite Number"', () => {
  const {getByLabelText} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)

  expect(input).toHaveAttribute('type', 'number')
})
