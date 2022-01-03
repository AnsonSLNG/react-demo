import React from 'react'
import {
  render,
  screen,
  fireEvent,
  waitFor,
  queryAllByTestId,
  within,
} from '@testing-library/react'
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
  userEvent.click(input)
})

test('Remove todo button onClick', async () => {
  render(<App />)
  const input = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement
  userEvent.type(input, 'new todo item{enter}')

  const removeBtn = screen.getByTestId('remove-todo-btn')
  userEvent.click(removeBtn)

  expect(screen.queryByText('new todo item')).not.toBeInTheDocument()
})

test('change status view', async () => {
  render(<App />)
  const input = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement
  userEvent.type(input, '{enter}')
  userEvent.type(input, 'Active todo item{enter}')
  userEvent.type(input, 'Completed todo item{enter}')
  await screen.findByText('Active todo item')
  await screen.findByText('Completed todo item')

  const checkbox = screen.queryAllByTestId('todo-checkbox')
  userEvent.click(checkbox[1])

  userEvent.click(screen.getByTestId('Active-status'))
  expect(screen.getByText('Active todo item')).toBeInTheDocument()
  expect(screen.queryByText('Completed todo item')).not.toBeInTheDocument()

  userEvent.click(screen.getByTestId('Completed-status'))
  expect(screen.getByText('Completed todo item')).toBeInTheDocument()
  expect(screen.queryByText('Active todo item')).not.toBeInTheDocument()

  userEvent.click(screen.getByTestId('Clear-completed-status'))
  expect(screen.queryByText('Completed todo item')).not.toBeInTheDocument()

  //   userEvent.click(screen.getByTestId('Clear-completed-status'))
})

test('edit item onDouble click', async () => {
  render(<App />)
  const input = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement
  userEvent.type(input, 'new todo item{enter}')

  userEvent.click(screen.getByText('new todo item'))

  //   fireEvent.change(screen.getByPlaceholderText('edit input'), {
  //     target: { value: 'new todo item' },
  //   })
  //   expect(input.value).toBe('todo item 1')
})
