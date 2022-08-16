import {useEffect, useState} from "react";

function useFetch() {
    const url = 'http://localhost:1337/tasks';
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getTodos();
    }, [url, todos]);

    function getTodos() {
        setLoading(true);
        fetch(url, {
            method: 'GET',
            mode: 'cors',
        }).then((res) => {
            return res.json();
        })
            .then((data) => {
                setTodos(data);
            })
            .catch(error => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function setTodo(data, method) {
        setLoading(true);
        console.log(method)
        fetch(url, {
            method: method,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .catch(error => {
            setError(error);
        })
        .finally(() => {
            setLoading(false);
        });
    }
    return {todos, loading, error, getTodos, setTodo};
}

export default useFetch;