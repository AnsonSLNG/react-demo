export interface IToDoList {
  id: number
  active: boolean
  text: string
}

export interface IFilterStatus {
  data: IToDoList[]
  isActive: boolean | undefined
}

export interface ITodo {
  todoContentOnChange: (id: number) => void
  todoContentRemove: (id: number) => void
  editTodoOnChange: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void
  editKeydown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  data: IToDoList
}
