import styled from 'styled-components';
import React from 'react';

const ReminderWrapper = styled.div`
    background-color: ${props => (props.colour ? props.colour : '#bfccc847')};
    display: inline-block;
    width: 100%;
    padding: 5px 10px;
    font-size: 0.8rem;
`;

const Reminder = props => {
    const { colour, time, title } = props;
    return (
        <ReminderWrapper colour={colour}>
            <header>{title}</header>
            <p>Time: {time}</p>
        </ReminderWrapper>
    );
};

export default Reminder;
