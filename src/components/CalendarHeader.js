import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import ChangeMonthButton from './ChangeMonthButton';

const CalendarHeader = props => {
    const { prev, next, date } = props;
    return (
        <Wrapper>
            <ChangeMonthButton click={prev} aria-label='Previous Month'>
                {'<'}
            </ChangeMonthButton>
            {format(date, 'MMMM YYYY')}
            <ChangeMonthButton click={next} aria-label='Next Month'>
                {'>'}
            </ChangeMonthButton>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    background: #bfccc847;
    padding: 20px 0;
    font-size: 2rem;
    outline: 1px inset;
`;

export default CalendarHeader;
