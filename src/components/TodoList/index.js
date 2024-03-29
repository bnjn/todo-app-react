

function TodoList(props) {

    const todos = props.todos;
    const handleComplete = props.handleComplete;
    const handleEditModal = props.handleEditModal;
    const handleDelete = props.handleDelete;
    const loading = props.loading;
    const decode = props.decode;

    if (loading) return <h2>LOADING...</h2>;

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
                            <h3>{decode(todo.title)}</h3>
                            <p>{decode(todo.task)}</p>
                            <p>{decode(todo.date)}</p>
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