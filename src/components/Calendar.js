import React, { Component, Fragment } from 'react';
import {
    getMonth,
    isToday,
    getDaysInMonth,
    eachDay,
    startOfMonth,
    endOfMonth,
    getDay,
    format,
    subMonths,
} from 'date-fns';
import styled from 'styled-components';
import GlobalStyle from '../styles';

const CalendarHeader = styled.div`
    display: block;
    text-align: center;
    background: #bfccc847;
    padding: 20px 0;
    font-size: 2rem;
    outline: 1px inset;
`;

const CalendarHeaderMenu = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin: 0;
    padding: 0;
    font-size: 1.2rem;
    background: #c80a0a57;
`;

const CalendarHeaderItem = styled.li`
    text-align: center;
    outline: 1px inset;
    padding: 10px 0;
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
    outline: 1px inset;
    display: flex;
    flex-flow: column;
    justify-content: start;
    align-items: start;
    padding: 20px;
    font-size: 1.2rem;
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
const todayMonthRange = eachDay(startOfMonth(today), endOfMonth(today));

// Check if start of month is on a Sunday
// If not, add items from last month till first Sunday
const dayAtStart = getDay(startOfMonth(today));
const daysToGetFromLastMonth = 6 - dayAtStart;
const lastMonthDays = getDaysInMonth(4);
console.log(endOfMonth(today));
console.log(subMonths(endOfMonth(today), 1));

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
                    <CalendarHeader>{format(today, 'MMMM')}</CalendarHeader>
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
