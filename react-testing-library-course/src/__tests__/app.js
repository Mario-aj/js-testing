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

    userEvent.click(screen.getByRole('link', {name: /fill .* form/i}))

    userEvent.type(screen.getByLabelText(/favorite food/i), fakeData.food)
    userEvent.click(screen.getByRole('link', {name: /next/i}))

    userEvent.type(screen.getByLabelText(/favorite drink/i), fakeData.drink)
    userEvent.click(screen.getByRole('link', {name: /review/i}))

    expect(screen.getByLabelText(/food/i)).toHaveTextContent(fakeData.food)
    expect(screen.getByLabelText(/drink/i)).toHaveTextContent(fakeData.drink)

    userEvent.click(screen.getByRole('button', {name: /confirm/i}))
    expect(mockSubmitForm).toHaveBeenCalledWith(fakeData)
    expect(mockSubmitForm).toHaveBeenCalledTimes(1)

    userEvent.click(await screen.findByRole('link', {name: /home/i}))
    expect(
      screen.getByRole('heading', {name: /welcome home/i}),
    ).toBeInTheDocument()
  })
})
