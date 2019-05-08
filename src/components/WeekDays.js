import React from 'react';
import styled from 'styled-components';

const WeekDays = () => (
    <WeekMenu>
        <WeekDay>Sun</WeekDay>
        <WeekDay>Mon</WeekDay>
        <WeekDay>Tue</WeekDay>
        <WeekDay>Wed</WeekDay>
        <WeekDay>Thu</WeekDay>
        <WeekDay>Fri</WeekDay>
        <WeekDay>Sat</WeekDay>
    </WeekMenu>
);

const WeekMenu = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin: 0;
    padding: 0;
    font-size: 1.2rem;
    background: #c80a0a57;
`;

const WeekDay = styled.li`
    text-align: center;
    outline: 1px inset;
    padding: 10px 0;
`;

export default WeekDays;
