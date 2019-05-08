import React, { Component, Fragment } from 'react';
import {
    isToday,
    eachDay,
    startOfMonth,
    endOfMonth,
    getDay,
    format,
    subMonths,
    addMonths,
    isSameMonth,
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
    background-color: ${props =>
        props.isToday ? '#faf0e9' : props.isSameMonth ? '#bfccc847' : '#fff'};
`;

const today = new Date();
const currentRange = eachDay(startOfMonth(today), endOfMonth(today));

const padMonthRange = monthRange => {
    const testDay = endOfMonth(monthRange[0]);
    // Get padding for previous month
    const paddingPrev = 6 - getDay(startOfMonth(monthRange[0]));
    const prevMonthRange = eachDay(
        startOfMonth(subMonths(testDay, 1)),
        endOfMonth(subMonths(testDay, 1))
    );
    const daysPaddingPrev = prevMonthRange.slice(-paddingPrev);
    // Get padding for next mounth
    const paddingNext = 6 - getDay(testDay);
    const nextMonthRange = eachDay(
        startOfMonth(addMonths(testDay, 1)),
        endOfMonth(addMonths(testDay, 1))
    );
    const daysPaddingNext = nextMonthRange.slice(0, paddingNext);

    return [...daysPaddingPrev, ...monthRange, ...daysPaddingNext];
};

const currentMonthRange = padMonthRange(currentRange);

// eslint-disable-next-line react/destructuring-assignment
const DayWrapper = props => <Day {...props}>{props.day}</Day>;
const days = currentMonthRange.map(day => {
    const formattedDay = format(day, 'D');
    return (
        <DayWrapper
            key={day.toISOString()}
            day={formattedDay}
            isToday={isToday(day)}
            isSameMonth={isSameMonth(day, today)}
        />
    );
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
