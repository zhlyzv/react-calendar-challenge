import { eachDay, startOfMonth, endOfMonth, addMonths, subMonths } from 'date-fns';
import uuid from 'uuid';
import * as actionTypes from '../actions/actionTypes';

/**
 * getMonthRange - Get an array of all the dates in a given month
 *
 * @param {Date} date - Date in the month whose range we're trying to get
 * @returns {Date[]}
 */
const getMonthRange = date =>
    eachDay(startOfMonth(date), endOfMonth(date)).map(day => ({
        date: day,
        id: uuid(),
        reminders: [],
    }));

/**
 * getPrevOrNextRange - Get an array of all the dates in the previous or next month
 *
 * @param {Date[]} monthRange - The month range to check against
 * @param {String} time - 'next' or 'prev' month range to return
 * @returns {Date[]}
 */
const getPrevOrNextRange = (monthRange, time) => {
    // Take the first day of the range passed
    const dateInCurrentRange = monthRange[0].date;
    let dateInRange = null;
    if (time === 'next') {
        dateInRange = addMonths(dateInCurrentRange, 1);
    }
    if (time === 'prev') {
        dateInRange = subMonths(dateInCurrentRange, 1);
    }
    return getMonthRange(dateInRange);
};

// initialize the current month from today's date
const currentMonth = getMonthRange(new Date());

const initialState = {
    currentMonthIndex: 0,
    month: currentMonth,
    year: { 0: currentMonth },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_NEXT_MONTH: {
            const nextMonthIndex = state.currentMonthIndex + 1;

            const updatedYear = {
                ...state.year,
                // make sure current month is saved before updating state
                [state.currentMonthIndex]: state.month,
                [nextMonthIndex]: state.year[nextMonthIndex]
                    ? state.year[nextMonthIndex]
                    : getPrevOrNextRange(state.month, 'next'),
            };

            return {
                ...state,
                currentMonthIndex: nextMonthIndex,
                month: updatedYear[nextMonthIndex],
                year: updatedYear,
            };
        }
        case actionTypes.SET_PREV_MONTH: {
            const nextMonthIndex = state.currentMonthIndex - 1;

            const updatedYear = {
                ...state.year,
                // make sure current month is saved before updating state
                [state.currentMonthIndex]: state.month,
                [nextMonthIndex]: state.year[nextMonthIndex]
                    ? state.year[nextMonthIndex]
                    : getPrevOrNextRange(state.month, 'prev'),
            };

            return {
                ...state,
                currentMonthIndex: nextMonthIndex,
                month: updatedYear[nextMonthIndex],
                year: updatedYear,
            };
        }
        case actionTypes.CREATE_REMINDER: {
            const { reminder, dayId } = action;

            const updatedMonth = state.month.map(day => {
                if (day.id === dayId) {
                    return {
                        ...day,
                        reminders: day.reminders.concat(reminder),
                    };
                }
                return day;
            });

            const updatedYear = {
                ...state.year,
                [state.currentMonthIndex]: updatedMonth,
            };
            return {
                ...state,
                month: updatedMonth,
                year: updatedYear,
            };
        }
        case actionTypes.UPDATE_REMINDER: {
            return {
                ...state,
            };
        }
        case actionTypes.DELETE_REMINDER: {
            return {
                ...state,
            };
        }
        default:
            return state;
    }
};

export default reducer;
