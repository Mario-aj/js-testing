/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import {render as rtlRender} from '@testing-library/react'

import {Main} from '../main'

function render(ui, {route = '/', ...renderOptions} = {}) {
  const history = createMemoryHistory({initialEntries: [route]})

  function Wrapper({children}) {
    return <Router history={history}>{children}</Router>
  }

  return {
    ...rtlRender(ui, {wrapper: Wrapper, ...renderOptions}),
  }
}

test('main renders home within Router', () => {
  const {getByRole} = render(<Main />)

  expect(getByRole('heading')).toHaveTextContent(/home/i)
})

test('main renders not match route', () => {
  const {getByRole} = render(<Main />, {
    route: '/something-not-matches',
  })

  expect(getByRole('heading')).toHaveTextContent(/404/i)
})
