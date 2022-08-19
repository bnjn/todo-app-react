import {useEffect, useState} from "react";

function useFetch() {
    const port = "1337";
    const url = `https://localhost:${port}/tasks`;
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [validationError, setValidationError] = useState(null);


    // Get todos from API on first render and set a state with the result if OK.
    useEffect(() => {
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
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [url]);

    // Log any API errors to console.
    useEffect((error) => {
        if (error) {
            console.log(error);
        }
        }, [error]);

    // Refresh state with todos from the API
    function getTodos() {
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

    // Handles POST, PUT and DELETE http methods with JSON as the request body. If the data is malformed, it will set validationError with the reason/s.
    function setTodo(data, method) {
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
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            // Expect errors as an array of objects with props: type and error.
            if (data && Array.isArray(data)) {
                if (data.length > 0) {
                    setValidationError(data);
                }
            }
        })
        .catch(error => {
            setError(error);
        })
        .finally(() => {
            setLoading(false);
            getTodos();
        });
    }

    return {todos, loading, setValidationError, validationError, setTodo, error};
}

export default useFetch;