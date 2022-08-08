import './App.css';
import {useEffect, useState} from "react";

function App() {

  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState(null);

      useEffect(() => {
          getTodos();
      }, []);

      useEffect(() => {
          if (currentTodo) {
              document.querySelector('#editTitle').value = currentTodo.title;
              document.querySelector('#editBody').value = currentTodo.task;
          }
      }, [currentTodo]);

    function getTodos() {
        fetch('http://localhost:1337/tasks', {
            method: 'GET',
            mode: 'cors',
        }).then((res) => {
            return res.json();
        })
            .then((data) => {
                setTodos(data);
            })
            .catch(err => console.error(err));
    }

    function handleCreate(e) {
        e.preventDefault();
        const title = document.querySelector('#taskTitle').value;
        const taskBody = document.querySelector('#taskBody').value;
        const task = {
            title: title,
            task: taskBody,
            completed: false,
            date: new Date()
        };
        createTask(task);
    }

    function handleEditModal(e) {
        e.preventDefault();
        setCurrentTodo(todos.find(todo => todo._id === e.target.parentNode.id));
        const editModal = document.querySelector('.edit-modal');
        editModal.style.display = 'flex';
    }

    function handleEditModalClose(e) {
        e.preventDefault();
        const editModal = document.querySelector('.edit-modal');
        editModal.style.display = 'none';
        setCurrentTodo(null);
    }

    function handleEdit(e) {

    }

    function handleDelete(e) {
        e.preventDefault();
    }

    function createTask(task) {
      fetch('http://localhost:1337/tasks', {
          method: 'POST',
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify(task)
      }).then(() => {getTodos()})
        .catch(err => console.error(err));
  }

  function editTask(task) {

  }

  return (
    <div className="App">
        <div className='edit-modal'>
            <form className='edit-form'>
                <label form='editTitle'>Title</label>
                <input id='editTitle' type='text'/>
                <label form='editBody'>Task</label>
                <input id='editBody' type='text'/>
                <button type='button' onClick={handleEdit}>Submit</button>
                <button type='button' onClick={handleEditModalClose}>Cancel</button>
            </form>
        </div>
        <header>
            <div className='title'>
                <h1>ToDo Application</h1>
            </div>
        </header>
        <form className='task-form'>
            <label form='taskTitle'>Title</label>
            <input id='taskTitle' type='text'/>
            <label form='taskBody'>Task</label>
            <input id='taskBody' type='text'/>
            <button id='submitButton' onClick={handleCreate}>Submit</button>
        </form>
        <div className="tasks">
        {
            todos.map((todo, index) => {
                return (
                    <div className='task-card' id={todo._id} key={index}>
                        <h3>{todo.title}</h3>
                        <p>{todo.task}</p>
                        <p>Completed: {todo.completed ? 'yes' : 'no'}</p>
                        <p>{todo.date}</p>
                        <button onClick={handleEditModal}>Edit</button><button onClick={handleDelete}>Delete</button>
                    </div>
                )
            })
        }
        </div>
    </div>
  );
}

export default App;
