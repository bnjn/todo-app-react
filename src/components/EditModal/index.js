function EditModal(props) {

    const currentTodo = props.currentTodo;
    const setCurrentTodo = props.setCurrentTodo;
    const getTodos = props.getTodos;

    function handleEditModalClose(e) {
        e.preventDefault();
        const editModal = document.querySelector('.edit-modal');
        editModal.style.display = 'none';
        setCurrentTodo(null);
    }

    function handleEdit(e) {
        e.preventDefault();
        const title = document.querySelector('#editTitle').value;
        const task = document.querySelector('#editBody').value;
        if (title !== currentTodo.title || task !== currentTodo.task) {
            const body = {
                _id: currentTodo._id,
                title: title,
                task: task
            }
            editTask(body);
        }
        const editModal = document.querySelector('.edit-modal');
        editModal.style.display = 'none';
        setCurrentTodo(null);
    }

    function editTask(task) {
        fetch('http://localhost:1337/tasks', {
            method: 'put',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: task._id,
                title: task.title,
                task: task.task,
                type: 'edit'
            })
        }).then(() => {getTodos()})
            .catch(err => console.error(err));
    }

    return (
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
    )
}

export default EditModal;