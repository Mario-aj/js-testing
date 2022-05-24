/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import {build, sequence, fake} from 'test-data-bot'
import {render, fireEvent, waitFor} from '@testing-library/react'
import {Redirect as MockRedirect} from 'react-router'

import {Editor} from '../post-editor-08-custom-render'
import {savePost as mockSavePost} from '../api'

jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  }
})
jest.mock('../api')

beforeEach(jest.clearAllMocks)

const postBuilder = build('post').fields({
  title: fake((f) => f.lorem.words()),
  content: fake((f) => f.lorem.paragraphs().replace(/\r/g, '')),
  tags: fake((f) => [f.lorem.words(), f.lorem.words(), f.lorem.words()]),
})

const userBuilder = build('user').fields({
  id: sequence((s) => `user-${s}`),
})

function renderEditor() {
  const fakeUser = userBuilder()
  const fakePost = postBuilder()
  const utils = render(<Editor user={fakeUser} />)

  utils.getByLabelText(/title/i).value = fakePost.title
  utils.getByLabelText(/content/i).value = fakePost.content
  utils.getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitButton = utils.getByText(/submit/i)

  return {
    ...utils,
    submitButton,
    fakePost,
    fakeUser,
  }
}

test('renders a form with title, content, tags and a submit button', async () => {
  mockSavePost.mockResolvedValueOnce()
  const prevDate = new Date().getTime()
  const {submitButton, fakePost, fakeUser} = renderEditor()

  fireEvent.click(submitButton)
  expect(submitButton).toBeDisabled()
  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    date: expect.any(String),
    authorId: fakeUser.id,
  })
  expect(mockSavePost).toHaveBeenCalledTimes(1)

  const postDate = new Date().getTime()
  const date = new Date(mockSavePost.mock.calls[0][0].date).getTime()
  expect(date).toBeGreaterThanOrEqual(prevDate)
  expect(date).toBeLessThanOrEqual(postDate)

  await waitFor(() => expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}))
})

test('renders error state', async () => {
  const testError = 'Test Error'
  mockSavePost.mockRejectedValueOnce({data: {error: testError}})
  const {findByRole, submitButton} = renderEditor()

  fireEvent.click(submitButton)

  expect(await findByRole('alert')).toHaveTextContent(testError)
  expect(submitButton).toBeEnabled()
})
