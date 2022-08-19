import './App.css';
import {useEffect, useState} from "react";
import EditModal from "./components/EditModal";
import TodoList from "./components/TodoList";
import Header from "./components/Header";
import NewTaskForm from "./components/NewTaskForm";
import useFetch from "./hooks/useFetch";
import {decode} from "html-entities";

function App() {
  const [currentTodo, setCurrentTodo] = useState(null);
    const {todos, loading, validationError, setValidationError, setTodo} = useFetch();

    // Set currentTodo state to edit box values
    useEffect(() => {
      if (currentTodo) {
          document.querySelector('#editTitle').value = decode(currentTodo.title);
          document.querySelector('#editBody').value = decode(currentTodo.task);
      }
  }, [currentTodo]);

    // Handle input validation errors from API
    useEffect(() => {
      if (validationError) {
            validationError.forEach((error) => {
                //console.log(`${error.type.charAt(0).toUpperCase() + error.type.slice(1)} ${error.error}.`);
                alert(`${error.type.charAt(0).toUpperCase() + error.type.slice(1)} ${error.error}.`)
            });
            setValidationError(null);
      }
    }, [validationError]);

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
        }
        setTodo(task, 'POST');
    }

    function handleEditModal(e) {
        e.preventDefault();
        setCurrentTodo(todos.find(todo => todo._id === e.target.parentNode.parentNode.id));
        const editModal = document.querySelector('.edit-modal');
        editModal.style.display = 'flex';
    }

    function handleDelete(e) {
        e.preventDefault();
        setTodo({_id: e.target.parentNode.parentNode.id}, 'DELETE');
    }

    function handleComplete(e) {
        e.preventDefault();
        const todo = todos.find(todo => todo._id === e.target.id);
        const task = {
            _id: e.target.id,
            type: 'complete',
            completed: todo.completed
        }
        setTodo(task, 'PUT');
    }

  return (
    <div className="App">
        <EditModal
            currentTodo={currentTodo}
            setCurrentTodo={setCurrentTodo}
            todos={todos}
            setTodo={setTodo}
        />
        <Header />
        <NewTaskForm
            handleCreate={handleCreate}
        />
        <TodoList
            decode={decode}
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
