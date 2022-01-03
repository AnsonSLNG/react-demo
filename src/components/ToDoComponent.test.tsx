import React from 'react'
import { render, screen, fireEvent, waitFor, queryAllByTestId } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('Remove todo button onClick', async () => {
  //   const input = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement
  //   const removeBtn = screen.getByTestId('remove-todo-btn')
  //   //   const addedItem = screen.getByText('new todo item')
  //   //   userEvent.type(input, 'new todo item{enter}')
  //   userEvent.click(removeBtn)
  //   expect(addedItem).not.toBeInTheDocument()
})
