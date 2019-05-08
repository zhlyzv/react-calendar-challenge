import * as actionTypes from '../actions/actionTypes';

const initialState = {
    currentMonthRange: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_MONTH_RANGE:
            return {
                ...state,
                currentMonthRange: action.range,
            };
        case actionTypes.SET_NEXT_MONTH_RANGE:
            return {
                ...state,
                currentMonthRange: action.range,
            };
        case actionTypes.SET_PREV_MONTH_RANGE:
            return {
                ...state,
                currentMonthRange: action.range,
            };
        default:
            return state;
    }
};

export default reducer;
