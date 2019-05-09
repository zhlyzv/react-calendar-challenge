import styled from 'styled-components';

const Button = styled.button`
    font-size: 18px;
    font-weight: 600;
    position: relative;
    cursor: pointer;
    display: inline-block;
    transition: 0.3s ease-out;
    color: #fff;
    text-align: center;
    border: none;
    border-radius: 50%;
    height: 36px;
    line-height: 36px;
    padding: 0 16px;
    background-color: #26a69a;
    &:hover {
        background-color: #2bbbad;
    }
`;

export default Button;
