/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import {render, fireEvent} from '@testing-library/react'

import {Editor} from '../post-editor-02-state'

test('renders a form with title, content, tags and a submit button', () => {
  const {getByLabelText, getByText} = render(<Editor />)
  const submitButton = getByText(/submit/i)

  expect(getByLabelText(/title/i)).toBeInTheDocument()
  expect(getByLabelText(/content/i)).toBeInTheDocument()
  expect(getByLabelText(/tags/i)).toBeInTheDocument()
  expect(getByText(/submit/i)).toBeInTheDocument()

  fireEvent.click(submitButton)
  expect(submitButton).toBeDisabled()
})
