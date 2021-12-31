import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { IToDoList, ITodo } from '../interface'

const ToDoLabel = styled.label`
  word-break: break-all;
  padding: 15px 15px 15px 80px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
  color: #d9d9d9;
  background-color: #fff;
  position: relative;
  border: 1px solid #ccc;
  border-top: 0px;
`

const ToDoCheckbox = styled.input`
  text-align: center;
  width: 40px;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none;
  left: 0px;
  margin-left: 7px;
`

const CloseButton = styled.button`
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  transition: color 0.2s ease-out;
`

const EditInput = styled.input`
  margin: 0;
  top: 0px;
  width: calc(100% - 60px);
  margin-left: 60px;
  font-size: 14px;
  position: absolute;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 15px 15px 15px 20px;
`

function ToDoContent({
  todoContentOnChange,
  todoContentRemove,
  editTodoOnChange,
  editKeydown,
  data,
}: ITodo) {
  const { active, text, id } = data
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>
  const [showInput, setShowInput] = useState(false)

  return (
    <div className="view display relative">
      <ToDoCheckbox
        className="toggle check z-10"
        type="checkbox"
        onChange={() => todoContentOnChange(id)}
        checked={active}
        value="check list 1"
      />
      <ToDoLabel
        className="todotod-content group"
        onDoubleClick={() => {
          setShowInput(true)
          setTimeout(() => {
            inputRef.current.focus()
          }, 50)
        }}
      >
        <p className={active === true ? 'line-through text-black text-sm' : 'text-black text-sm'}>
          {text}
        </p>
      </ToDoLabel>

      <CloseButton
        onClick={() => todoContentRemove(id)}
        type="button"
        className="destroy group-hover:block"
      >
        x
      </CloseButton>

      <EditInput
        ref={inputRef}
        type="text"
        className={`edit text-sm todo-input ${showInput ? 'block' : 'hidden'}`}
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => editTodoOnChange(e, id)}
        onBlur={() => setShowInput(false)}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          editKeydown(e)
        }}
      />
    </div>
  )
}

export default ToDoContent
