function TodoList(props) {

    const todos = props.todos;
    const handleComplete = props.handleComplete;
    const handleEditModal = props.handleEditModal;
    const handleDelete = props.handleDelete;

    return (
        <div className="tasks">
            {
                todos.map((todo, index) => {
                    let completed;
                    if (todo.completed) {
                        completed = 'task-card-completed';
                    } else {
                        completed = 'task-card-uncompleted';
                    }
                    return (
                        <div onClick={handleComplete} className={`task-card ${completed}`} id={todo._id} key={index}>
                            <h3>{todo.title}</h3>
                            <p>{todo.task}</p>
                            <p>{todo.date}</p>
                            <div onClick={(e) => e.stopPropagation()}>
                                <button type='button' onClick={handleEditModal}>Edit</button>
                                <button type='button' onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TodoList;