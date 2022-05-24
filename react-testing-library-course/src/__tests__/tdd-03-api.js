/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import {render, fireEvent} from '@testing-library/react'

import {Editor} from '../post-editor-03-api'
import {savePost as mockSavePost} from '../api'

jest.mock('../api')

beforeEach(jest.clearAllMocks)

test('renders a form with title, content, tags and a submit button', () => {
  mockSavePost.mockResolvedValueOnce()
  const fakeUser = {
    id: 'user-id',
  }
  const fakePost = {
    title: 'Test Title',
    content: 'Test Content',
    tags: ['tag1', 'tag2'],
  }
  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)

  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)
  expect(submitButton).toBeDisabled()

  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    authorId: fakeUser.id,
  })
  expect(mockSavePost).toHaveBeenCalledTimes(1)
})
