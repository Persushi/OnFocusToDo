export function getToDos() {
    return function (dispatch) {
        return fetch("https://jsonplaceholder.typicode.com/todos")
            .then(response => response.json())
            .then((data) => {
                dispatch({ type: "GET_TO_DOS", payload: data })
            }).catch((error) => {
                dispatch({ type: 'SET_STATUS', status: 500 })
            })
    }
}
export function postLogin(user, password) {
    return function (dispatch) {
        return dispatch({ type: "POST_LOGIN", payload: { user, password } })
    }
}
export function putToDos(data) {
    return function (dispatch) {
        return dispatch({ type: "PUT_TO_DOS", payload: data })
    }
}
export function postToDos(data) {
    return function (dispatch) {
        return dispatch({ type: "POST_TO_DOS", payload: data })
    }
}
export function removeTask(id) {
    return function (dispatch) {
        return dispatch({ type: "REMOVE_TASK", payload: id })
    }
}