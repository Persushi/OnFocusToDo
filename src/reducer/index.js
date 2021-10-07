const initialState = {
    isLogged: false,
    allResponse: [],
    error: false,
};


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "POST_LOGIN": if (action.payload.user === "admin" && action.payload.password === "admin") {
            return {
                ...state, isLogged: true, error: false
            }
        } else {
            return { ...state, error: true }
        }
        case "GET_TO_DOS":
            return { ...state, allResponse: action.payload }
        case "PUT_TO_DOS":
            return {
                ...state, allResponse: state.allResponse.map((aux) => {
                    if (action.payload.id === aux.id) {
                        return { ...aux, completed: action.payload.completed, title: action.payload.title ? action.payload.title : aux.title }
                    } return aux
                })
            }
        case "POST_TO_DOS":
            if (!action.payload.title.trim()) return state
            return {
                ...state, allResponse: [{ ...action.payload, id: state.allResponse.length }].concat(state.allResponse)
            }
        case "REMOVE_TASK":
            return {
                ...state, allResponse: state.allResponse.filter((aux) => aux.id !== action.payload)
            }
        default: return state
    }
}

export default rootReducer;