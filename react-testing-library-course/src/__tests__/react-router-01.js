/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import {render} from '@testing-library/react'

import {Main} from '../main'

test('main renders home within Router', () => {
  const history = createMemoryHistory({initialEntries: ['/']})
  const {getByRole} = render(
    <Router history={history}>
      <Main />
    </Router>,
  )

  expect(getByRole('heading')).toHaveTextContent(/home/i)
})
