import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');

    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  // const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const [isEditing, setIsEditing] = useState (false);

  const [currentTodo, setCurrentTodo] = useState ({});

  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos));
  },[todos]);

  function handleInputChange(e) {
    setTodo(e.target.value);
  }

  function handleEditInputChange (e) {
    setCurrentTodo ({...currentTodo, text: e.target.value});
    console.log(currentTodo);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (todo !== "") {
      console.log(todos)
      setTodos([...todos,{id: todos.length + 1,text: todo.trim()}]);
    }
    setTodo("");
  }

  function handleEditFormSubmit(e) {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  function handleDeleteClick (id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !==id;
    });
    setTodos(removeItem);       
  }

  function handleUpdateTodo (id, updatedTodo) {
    const updatedItem = todos.map ((todo) => {
      return todo.id ===  id ? updatedTodo : todo;
    });

    setIsEditing(false);
    setTodos(updatedItem);
  }

  function handleEditClick (todo) {
    setIsEditing (true);
    setCurrentTodo({...todo});
  }

  return (

    <div className="App">

    {isEditing ? (
      <form onSubmit={handleEditFormSubmit}>
      <h2>Edit Todo</h2>
      <label htmlFor='editTodo'>Edit todo: </label>
      <input 
      name='editTodo'
      type='text'
      placeholder='Edit todo'
      value={currentTodo.text}
      onChange={handleEditInputChange}
      />
      </form>
    ) : (
      <form onSubmit={handleFormSubmit}>
        <input
          name="todo"
          type="text"
          placeholder="Create a new todo"
          value={todo}
          onChange={handleInputChange}
        />
      </form>
    )}

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleEditInputChange(todo)}>Edit</button>
            <button onClick={() => handleDeleteClick(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}