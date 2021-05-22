import './App.css';
import React , { useState , useRef , useEffect} from 'react';
import TodoList from "./TodoList";
import { v4 as uuid_v4 } from "uuid";

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
const [todos,setTodos] = useState([])
const todoNameRef = useRef() 

useEffect(() => {
 const storedTodos= JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
 if (storedTodos) setTodos(storedTodos)
}, [])

useEffect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
}, [todos])

function handleAddTodo(e) {
const name = todoNameRef.current.value
if (name === '') return
setTodos(prevTodos => {
return  [...prevTodos,{id: uuid_v4(),name: name, complete: false}]
})
todoNameRef.current.value= null
}
function handleClearTodos(){
  const newTodos= todos.filter(todo => !todo.complete)
  setTodos(newTodos)
}
function toggleTodo(id) {
  const newTodos = [...todos]
  const todo = newTodos.find(todo => todo.id === id)
  todo.complete = !todo.complete
  setTodos(newTodos)
}
  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
        <input ref={todoNameRef} type="text"  />
        <button onClick={handleAddTodo}>ADD TODO</button>
        <button onClick={handleClearTodos}>CLEAR TODO</button>
    </>
  )
}

export default App;