function NewTaskForm(props) {

    const handleCreate = props.handleCreate;

    return (
        <form className='task-form'>
            <label form='taskTitle'>Title</label>
            <input id='taskTitle' type='text'/>
            <label form='taskBody'>Task</label>
            <input id='taskBody' type='text'/>
            <button id='submitButton' onClick={handleCreate}>Submit</button>
        </form>
    )
}

export default NewTaskForm;