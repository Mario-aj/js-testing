/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import {render} from '@testing-library/react'

import {Editor} from '../post-editor-01-markup'

test('renders a form with title, content, tags and a submit button', () => {
  const {getByLabelText, getByText} = render(<Editor />)

  expect(getByLabelText(/title/i)).toBeInTheDocument()
  expect(getByLabelText(/content/i)).toBeInTheDocument()
  expect(getByLabelText(/tags/i)).toBeInTheDocument()
  expect(getByText(/submit/i)).toBeInTheDocument()
})
