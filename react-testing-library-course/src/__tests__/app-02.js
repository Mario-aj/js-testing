import React from 'react'
import {render, screen} from '@testing-library/react'

import userEvent from '@testing-library/user-event'
import App from '../app'
import {submitForm as mockSubmitForm} from '../api'

jest.mock('../api')

describe('App', () => {
  it('Can fill out a form acroos multiple pages', async () => {
    mockSubmitForm.mockResolvedValueOnce({success: true})
    const fakeData = {food: 'test food', drink: 'test-drink'}
    render(<App />)

    userEvent.click(await screen.findByRole('link', {name: /fill .* form/i}))

    userEvent.type(
      await screen.findByLabelText(/favorite food/i),
      fakeData.food,
    )
    userEvent.click(await screen.findByRole('link', {name: /next/i}))

    userEvent.type(
      await screen.findByLabelText(/favorite drink/i),
      fakeData.drink,
    )
    userEvent.click(await screen.findByRole('link', {name: /review/i}))

    expect(await screen.findByLabelText(/food/i)).toHaveTextContent(
      fakeData.food,
    )
    expect(await screen.findByLabelText(/drink/i)).toHaveTextContent(
      fakeData.drink,
    )

    userEvent.click(await screen.findByRole('button', {name: /confirm/i}))
    expect(mockSubmitForm).toHaveBeenCalledWith(fakeData)
    expect(mockSubmitForm).toHaveBeenCalledTimes(1)

    userEvent.click(await screen.findByRole('link', {name: /home/i}))
    expect(
      await screen.findByRole('heading', {name: /welcome home/i}),
    ).toBeInTheDocument()
  })
})
