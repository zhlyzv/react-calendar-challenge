import styled from 'styled-components';
import React from 'react';

const Edit = styled.div`
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-size: 1rem;
    opacity: 0;
    transition: all 0.3s linear;
`;

const Wrapper = styled.div`
    background-color: ${props => (props.colour ? props.colour : '#bfccc847')};
    display: inline-block;
    width: 100%;
    padding: 5px 10px;
    font-size: 0.8rem;
    color: #eee;
    position: relative;
    cursor: pointer;
    &:hover ${Edit} {
        opacity: 1;
    }
`;

const Reminder = props => {
    const { colour, time, title, openReminderForm } = props;
    return (
        <Wrapper colour={colour} onClick={openReminderForm}>
            <header>{title}</header>
            <p>Time: {time}</p>
            <Edit>🖊</Edit>
        </Wrapper>
    );
};

export default Reminder;
