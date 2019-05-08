import styled from 'styled-components';

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
        (!props ? 'red' : '') || (props.isToday ? '#faf0e9' : '#bfccc847')};
`;

export default Day;
