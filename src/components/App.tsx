import React, {
  KeyboardEvent,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'
import ToDoContent from './ToDoComponent'
import { IToDoList, IFilterStatus } from '../interface'

const Container = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 40px;
  background-color: #f5f5f5;
  margin: 0 auto;

  .new-todo {
    padding: 16px 60px;
    border: none;
    background-color: #ffff;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    border-bottom: 1px solid #ccc;

    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;

    color: inherit;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .create-todo {
    width: 600pxc;
    position: relative;
    .toggle-all {
      text-align: center;
      border: none;
      opacity: 0;
      position: absolute;

      & + label {
        width: 60px;
        height: 34px;
        font-size: 0;
        position: absolute;
        top: 15px;
        left: -4px;
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
        z-index: 100;

        &:before {
          content: '❯';
          font-size: 22px;
          color: #e6e6e6;
          padding: 10px 27px 10px 27px;
        }
      }
    }
  }
`

const H1 = styled.h1`
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  text-rendering: optimizeLegibility;
`

const TodoFooter = styled.div`
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: 0;
`

function App(): JSX.Element {
  const [todoList, setTodoList] = useState<IToDoList[]>([])
  const [displayList, setDisplayList] = useState<IToDoList[]>([])
  const [filterState, setFilterState] = useState('All')
  const [todoText, setTodoText] = useState('')
  const [startId, setStartId] = useState(0)

  const statusEle = [
    {
      status: 'All',
      onclick: () => {
        setDisplayList(filterStatus(todoList, 'All'))
        setFilterState('All')
      },
    },
    {
      status: 'Active',
      onclick: () => {
        setDisplayList(filterStatus(todoList, 'Active'))
        setFilterState('Active')
      },
    },
    {
      status: 'Completed',
      onclick: () => {
        setDisplayList(filterStatus(todoList, 'Completed'))
        setFilterState('Completed')
      },
    },
  ]

  const toggleActive = (id: number) => {
    const newTodoList = todoList.map(list => {
      if (id === list.id) {
        return {
          ...list,
          active: !list.active,
        }
      }
      return list
    })

    syncList(newTodoList)
  }

  const handleKeyDown = (e: React.KeyboardEvent, inputStartId: number) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (todoText === '') {
        return
      }

      const newTodoList = [...todoList, { id: inputStartId + 1, active: false, text: todoText }]
      setTodoList(newTodoList)
      setDisplayList(filterStatus(newTodoList, filterState))
      setTodoText('')
      setStartId(inputStartId + 1)
    }
  }

  const removeTodo = (id: number) => {
    const newTodoList = todoList.filter(list => id !== list.id)
    syncList(newTodoList)
  }

  const todoContentOnChange = (id: number) => {
    toggleActive(id)
  }

  const todoContentRemove = (id: number) => {
    removeTodo(id)
  }

  const editTodoOnChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const newTodoList = todoList.map(_list => {
      return id === _list.id ? { ..._list, text: e.currentTarget.value } : _list
    })

    syncList(newTodoList)
  }

  const editKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur()
    }
  }

  const syncList = (list: IToDoList[]) => {
    setTodoList(list)
    setDisplayList(list)
  }

  const filterStatus = (data: IToDoList[], status: string) => {
    switch (status) {
      case 'Completed':
        return data.filter(_d => _d.active === true)
      case 'Active':
        return data.filter(_d => _d.active === false)
      case 'All':
      default:
        return data
    }
  }

  const toggleAllStatus = () => {
    const switchStatus = todoList.every(_item => _item.active === true)

    const tempFilter = todoList.map(_list => {
      return {
        ..._list,
        active: !switchStatus,
      }
    })

    setTodoList(tempFilter)
    setDisplayList(filterStatus(tempFilter, filterState))
    // syncList(filterStatus(tempFilter, filterState))
  }

  return (
    <Container>
      <H1>todos</H1>
      <div className="create-todo">
        <input
          id="toggle-all"
          className="check toggle-all"
          type="checkbox"
          onChange={toggleAllStatus}
          data-testid="toggle-all-btn"
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <input
          onKeyPress={e => handleKeyDown(e, startId)}
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={e => setTodoText(e.currentTarget.value)}
          value={todoText}
          type="text"
        />
        <div data-testid="todo-content-render">
          {displayList.map(data => (
            <ToDoContent
              key={data.id}
              todoContentRemove={todoContentRemove}
              todoContentOnChange={todoContentOnChange}
              editTodoOnChange={editTodoOnChange}
              data={data}
              editKeydown={editKeydown}
              data-testid="todo-content"
            />
          ))}
        </div>

        <TodoFooter className="flex">
          <div>{displayList.length} item left</div>
          <ul className="flex pl-20">
            {statusEle.map(ele => (
              <li
                className={`pl-3 pr-3 mr-3 border-2 border-slate-600 ${
                  filterState === ele.status ? 'bg-green-300' : ''
                }`}
                key={ele.status}
              >
                <button data-testid={`${ele.status}-status`} type="button" onClick={ele.onclick}>
                  {ele.status}
                </button>
              </li>
            ))}
            <li
              className={`pl-3 pr-3 border-2 border-slate-600 ${
                todoList.some(_list => _list.active === true) ? 'block' : 'hidden'
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  syncList(filterStatus(todoList, 'Active'))
                }}
                data-testid="Clear-completed-status"
              >
                Clear completed
              </button>
            </li>
          </ul>
        </TodoFooter>
      </div>
    </Container>
  )
}

export default App
