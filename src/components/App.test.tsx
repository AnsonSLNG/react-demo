import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import '@testing-library/jest-dom/extend-expect'

test('to do item text onChange', () => {
  render(<App />)
  const input = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement
  fireEvent.change(input, { target: { value: 'todo item 1' } })
  expect(input.value).toBe('todo item 1')
})

test('Active button onClick', () => {
  render(<App />)
  const input = screen.getByTestId('All-status') as HTMLButtonElement
  fireEvent.click(input)
})
