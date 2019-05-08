import React, { Component, Fragment } from 'react';
import {
    getMonth,
    isToday,
    getDaysInMonth,
    getYear,
    setMonth,
    eachDay,
    startOfMonth,
    endOfMonth,
    getDay,
    format,
} from 'date-fns';
import styled from 'styled-components';
import GlobalStyle from '../styles';

const CalendarHeaderMenu = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin: 0;
    padding: 0;
`;

const CalendarHeaderItem = styled.li`
    text-align: center;
`;

const Wrapper = styled.div`
    width: 100%;
`;

const MonthWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(5, 200px);
`;

const Day = styled.div`
    font-weight: bold;
    outline: 1px solid;
    display: flex;
    flex-flow: column;
    justify-content: center;
    place-items: center center;
    background-color: ${props => (props.isToday ? '#faf0e9' : '#bfccc847')};
`;

const Dday = ({ day, isToday }) => (
    <Day isToday={isToday} className='Day'>
        {day}
    </Day>
);

// const monthNames = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December',
// ];
const today = new Date();
// const todayMonth = getMonth(today);
// const todayMonthDays = getDaysInMonth(today);
// const lastMonthDays = getDaysInMonth(todayMonth - 1);
const todayMonthRange = eachDay(startOfMonth(today), endOfMonth(today));
const days = todayMonthRange.map(day => {
    const formattedDay = format(day, 'D');
    return <Dday key={day.toISOString()} day={formattedDay} isToday={isToday(day)} />;
});

class Calendar extends Component {
    render() {
        return (
            <Fragment>
                <GlobalStyle />
                <Wrapper>
                    <CalendarHeaderMenu>
                        <CalendarHeaderItem>Sun</CalendarHeaderItem>
                        <CalendarHeaderItem>Mon</CalendarHeaderItem>
                        <CalendarHeaderItem>Tue</CalendarHeaderItem>
                        <CalendarHeaderItem>Wed</CalendarHeaderItem>
                        <CalendarHeaderItem>Thu</CalendarHeaderItem>
                        <CalendarHeaderItem>Fri</CalendarHeaderItem>
                        <CalendarHeaderItem>Sat</CalendarHeaderItem>
                    </CalendarHeaderMenu>
                    <MonthWrapper>{days}</MonthWrapper>
                </Wrapper>
            </Fragment>
        );
    }
}

export default Calendar;
