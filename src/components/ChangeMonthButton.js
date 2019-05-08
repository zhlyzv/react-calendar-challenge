import React from 'react';
import styled from 'styled-components';

const ChangeMonthButton = ({ click, children }) => <Button onClick={click}>{children}</Button>;

const Button = styled.button`
    font-size: 0.8rem;
    font-weight: 600;
    position: relative;
    cursor: pointer;
    display: inline-block;
    transition: 0.3s ease-out;
    color: #fff;
    background-color: #26a69a;
    text-align: center;
    border: none;
    border-radius: 50%;
    height: 36px;
    line-height: 36px;
    padding: 0 16px;
    &:hover {
        background-color: #2bbbad;
    }
`;

export default ChangeMonthButton;
