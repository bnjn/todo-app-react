function EditModal(props) {

    const currentTodo = props.currentTodo;
    const setCurrentTodo = props.setCurrentTodo;

    function handleEditModalClose(e) {
        e.preventDefault();
        const editModal = document.querySelector('.edit-modal');
        editModal.style.display = 'none';
        setCurrentTodo(null);
    }

    function handleEdit(e) {
        e.preventDefault();
        const title = document.querySelector('#editTitle').value;
        const todo = document.querySelector('#editBody').value;
        if (title !== currentTodo.title || todo !== currentTodo.task) {
            const task = {
                _id: currentTodo._id,
                title: title,
                task: todo,
                type: 'edit'
            }
            props.setTodo(task,'PUT');
        }
        const editModal = document.querySelector('.edit-modal');
        editModal.style.display = 'none';
        setCurrentTodo(null);
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