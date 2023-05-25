const initialValue = {};

const errorReducer = (state = initialValue, action) => {
    switch (action.type) {
        case 'ADD_ERROR':
            return action.payload;
        case 'REMOVE_ERROR':
            return {};
        default:
            return state;
    }
};

export default errorReducer;
