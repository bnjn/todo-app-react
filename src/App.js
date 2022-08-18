import './App.css';
import {useEffect, useState} from "react";
import EditModal from "./components/EditModal";
import TodoList from "./components/TodoList";
import Header from "./components/Header";
import NewTaskForm from "./components/NewTaskForm";
import useFetch from "./hooks/useFetch";

function App() {
  const [currentTodo, setCurrentTodo] = useState(null);
    const {todos, loading, error, setTodo} = useFetch();


    useEffect(() => {
      if (currentTodo) {
          document.querySelector('#editTitle').value = currentTodo.title;
          document.querySelector('#editBody').value = currentTodo.task;
      }
  }, [currentTodo]);

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
