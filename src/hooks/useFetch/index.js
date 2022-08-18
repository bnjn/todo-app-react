import {useEffect, useState} from "react";

function useFetch() {
    const port = "1337";
    const url = `https://localhost:${port}/tasks`;
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
//        console.log('effect triggered')
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
    }, [url]);

    function getTodos() {
//        console.log('getTodos triggered')
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
    }

    function setTodo(data, method) {
//        console.log('setTodos triggered')
        setLoading(true);
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
            getTodos();
        });
    }

    return {todos, loading, error, setTodo};
}

export default useFetch;