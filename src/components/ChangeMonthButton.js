import React from 'react';
import Button from './UI/Button';

const ChangeMonthButton = ({ click, children }) => <Button onClick={click}>{children}</Button>;

export default ChangeMonthButton;
