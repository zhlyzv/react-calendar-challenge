import styled from 'styled-components';
import React from 'react';
import Button from './UI/Button';

const DayWrapper = styled.div`
    font-weight: bold;
    outline: 1px inset;
    display: flex;
    flex-flow: column;
    justify-content: start;
    align-items: start;
    padding: 20px;
    position: relative;
    font-size: 1.2rem;
    background-color: ${props => (props.isToday ? '#ebf58e70' : '#bfccc847')};
`;

const ReminderButton = styled(Button)`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #b659aee0;
    &:hover {
        background-color: #b659aec7;
    }
`;

const Day = props => {
    const { empty, children, isToday, createReminder } = props;
    return (
        <DayWrapper isToday={isToday}>
            {!empty ? <ReminderButton onClick={createReminder}>+</ReminderButton> : null}
            {children}
        </DayWrapper>
    );
};

export default Day;
