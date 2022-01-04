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

test('add new to do', async () => {
  render(<App />)
  const input = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement
  userEvent.type(input, '{enter}')
  userEvent.type(input, 'new todo item 1{enter}')
  userEvent.type(input, 'new todo item 2{enter}')
  await screen.findByText('new todo item 1')
  await screen.findByText('new todo item 2')
})

test('Remove todo button onClick', async () => {
  render(<App />)
  const input = screen.getByPlaceholderText('What needs to be done?')
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

  userEvent.click(screen.getByTestId('All-status'))
  expect(screen.getByText('Completed todo item')).toBeInTheDocument()
  expect(screen.getByText('Active todo item')).toBeInTheDocument()

  userEvent.click(screen.getByTestId('Clear-completed-status'))
  expect(screen.queryByText('Completed todo item')).not.toBeInTheDocument()
})

test('edit item onDouble click', async () => {
  render(<App />)
  const input = screen.getByPlaceholderText('What needs to be done?')
  userEvent.type(input, 'new todo item{enter}')

  const editInput = screen.getByPlaceholderText('edit input')
  userEvent.dblClick(screen.getByText('new todo item'))

  userEvent.type(editInput, ' edit{enter}')
  expect(screen.getByText('new todo item edit')).toBeInTheDocument()
})

test('toggle all status', async () => {
  render(<App />)
  const input = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement
  userEvent.type(input, 'todo item1{enter}')
  userEvent.type(input, 'todo item2{enter}')
  //   await screen.findByText('todo item1')
  //   await screen.findByText('todo item2')

  const checkbox1 = screen.queryAllByTestId('todo-checkbox')[0] as HTMLInputElement
  const checkbox2 = screen.queryAllByTestId('todo-checkbox')[1] as HTMLInputElement
  userEvent.click(screen.getByTestId('toggle-all-btn'))
  expect(checkbox1.checked).toEqual(true)
  expect(checkbox2.checked).toEqual(true)

  userEvent.click(screen.getByTestId('toggle-all-btn'))
  expect(checkbox1.checked).toEqual(false)
  expect(checkbox2.checked).toEqual(false)
})
