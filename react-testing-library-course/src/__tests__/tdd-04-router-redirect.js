/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import {render, fireEvent, waitFor} from '@testing-library/react'
import {Redirect as MockRedirect} from 'react-router'

import {Editor} from '../post-editor-04-router-redirect'
import {savePost as mockSavePost} from '../api'

jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  }
})
jest.mock('../api')

beforeEach(jest.clearAllMocks)

test('renders a form with title, content, tags and a submit button', async () => {
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

  await waitFor(() => expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}))
})
