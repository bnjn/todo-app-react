import './App.css';
import {useEffect, useState} from "react";
import EditModal from "./components/EditModal";
import TodoList from "./components/TodoList";
import Header from "./components/Header";
import NewTaskForm from "./components/NewTaskForm";
import useFetch from "./hooks/useFetch";

function App() {
  const [currentTodo, setCurrentTodo] = useState(null);
  const {todos, loading, error, getTodos} = useFetch(
      'http://localhost:1337/tasks',
      'GET'
  );

  useEffect(() => {
      if (currentTodo) {
          document.querySelector('#editTitle').value = currentTodo.title;
          document.querySelector('#editBody').value = currentTodo.task;
      }
  }, [currentTodo]);

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

    function deleteTask(id) {
        fetch('http://localhost:1337/tasks', {
            method: 'delete',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: id
            })
        }).then(() => {getTodos()})
            .catch(err => console.error(err));
    }

    function completeTask(task) {
        fetch('http://localhost:1337/tasks', {
            method: 'put',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: task.id,
                type: 'complete',
                completed: task.completed
            })
        }).then(() => {getTodos()})
            .catch(err => console.error(err));
    }

    // Handle onClicks

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
        setCurrentTodo(todos.find(todo => todo._id === e.target.parentNode.parentNode.id));
        const editModal = document.querySelector('.edit-modal');
        editModal.style.display = 'flex';
    }

    function handleDelete(e) {
        e.preventDefault();
        deleteTask(e.target.parentNode.parentNode.id);
    }

    function handleComplete(e) {
        e.preventDefault();
        const todo = todos.find(todo => todo._id === e.target.id);
        completeTask({id: e.target.id, completed: todo.completed});
    }

  return (
    <div className="App">
        <EditModal
            currentTodo={currentTodo}
            setCurrentTodo={setCurrentTodo}
            todos={todos}
            getTodos={getTodos}
        />
        <Header />
        <NewTaskForm
            handleCreate={handleCreate}
        />
        <TodoList
            todos={todos}
            loading={loading}
            handleComplete={handleComplete}
            handleEditModal={handleEditModal}
            handleDelete={handleDelete}
        />
    </div>
  );
}

export default App;
