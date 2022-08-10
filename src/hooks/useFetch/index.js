import {useEffect, useState} from "react";

function useFetch(url, method, data) {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Get todos.
    useEffect(() => {
        setLoading(true);
        fetch(url, {
            method: method,
            mode: 'cors',
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            setTodos(data);
        })
        .catch((error) => {
            setError(error);
        })
        .finally(() => {
            setLoading(false);
        });
    }, [url]);

    function getTodos() {
        setLoading(true);
        fetch('http://localhost:1337/tasks', {
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

    // useEffect(() => {
    //     console.log(todos);
    // }, [todos]);

    return {todos, loading, error, getTodos};
}

export default useFetch;