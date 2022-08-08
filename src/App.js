import './App.css';
import {useEffect, useState} from "react";

function App() {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
      getTodos();
  }, []);

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

  function handleSubmit(e) {
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

  function createTask(task) {
      fetch('http://localhost:1337/tasks', {
          method: 'POST',
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify(task)
      }).then((res) => {getTodos()})
        .catch(err => console.error(err));
  }


  return (
    <div className="App">
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
            <button id='submitButton' onClick={handleSubmit}>Submit</button>
        </form>
        <div className="tasks">
        {
            todos.map((todo, index) => {
                console.log(todo.completed)
                return (
                    <div className='task-card' id={todo._id} key={index}>
                        <h3>{todo.title}</h3>
                        <p>{todo.task}</p>
                        <p>Completed: {todo.completed ? 'yes' : 'no'}</p>
                        <p>{todo.date}</p>
                        <button>Edit</button><button>Delete</button>
                    </div>
                )
            })
        }
        </div>
    </div>
  );
}

export default App;
