import { eachDay, startOfMonth, endOfMonth, addMonths, subMonths } from 'date-fns';
import * as actionTypes from './actionTypes';

/**
 * getMonthRange - Get an array of all the dates in a given month
 *
 * @param {Date} date - Date in the month whose range we're trying to get
 * @returns {Date[]}
 */
const getMonthRange = date => eachDay(startOfMonth(date), endOfMonth(date));

/**
 * getPrevOrNextRange - Get an array of all the dates in the previous or next month
 *
 * @param {Date[]} monthRange - The month range to check against
 * @param {String} time - 'next' or 'prev' month range to return
 * @returns {Date[]}
 */
const getPrevOrNextRange = (monthRange, time) => {
    // Take the first day of the range passed
    const dateInCurrentRange = monthRange[0];
    let dateInRange = null;
    if (time === 'next') {
        dateInRange = addMonths(dateInCurrentRange, 1);
    }
    if (time === 'prev') {
        dateInRange = subMonths(dateInCurrentRange, 1);
    }
    return getMonthRange(dateInRange);
};

export const setCurrentMonthRange = dateInMonth => {
    const range = getMonthRange(dateInMonth);
    return {
        type: actionTypes.SET_CURRENT_MONTH_RANGE,
        range,
    };
};

export const setNextMonthRange = currentRange => {
    const range = getPrevOrNextRange(currentRange, 'next');
    return {
        type: actionTypes.SET_NEXT_MONTH_RANGE,
        range,
    };
};

export const setPrevMonthRange = currentRange => {
    const range = getPrevOrNextRange(currentRange, 'prev');
    return {
        type: actionTypes.SET_PREV_MONTH_RANGE,
        range,
    };
};
