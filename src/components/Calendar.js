import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isToday, getDay, format, isSameMonth } from 'date-fns';
import styled from 'styled-components';
import * as actions from '../store/actions';

const CalendarHeader = styled.div`
    display: flex;
    justify-content: space-evenly;
    background: #bfccc847;
    padding: 20px 0;
    font-size: 2rem;
    outline: 1px inset;
`;

const CalendarHeaderButton = styled.button`
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
    grid-template-rows: repeat(6, 200px);
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
        (!props ? 'red' : '') || (props.isToday ? '#faf0e9' : '#bfccc847')};
`;

// eslint-disable-next-line react/destructuring-assignment
const DayWrapper = props => <Day {...props}>{props.day}</Day>;

class Calendar extends Component {
    componentWillMount() {
        this.props.onSetCurrentMonthRange(new Date());
    }

    render() {
        const { currentMonthRange } = this.props;
        let days = null;
        if (currentMonthRange.length) {
            const padding = Array(getDay(currentMonthRange[0])).fill(null);
            const paddedRange = [...padding, ...currentMonthRange];
            days = paddedRange.map(day => {
                if (day) {
                    const formattedDay = format(day, 'D');
                    return (
                        <DayWrapper
                            key={day.toISOString()}
                            day={formattedDay}
                            isToday={isToday(day)}
                        />
                    );
                }
                // This isn't really random 🤷‍
                return <DayWrapper key={Math.random()} />;
            });
        }
        return (
            <Wrapper>
                <CalendarHeader>
                    <CalendarHeaderButton
                        onClick={() => this.props.onSetPrevMonthRange(this.props.currentMonthRange)}
                        aria-label='Previous Month'
                    >
                        {'<'}
                    </CalendarHeaderButton>
                    {format(currentMonthRange[0], 'MMMM YYYY')}
                    <CalendarHeaderButton
                        onClick={() => this.props.onSetNextMonthRange(this.props.currentMonthRange)}
                        aria-label='Next Month'
                    >
                        {'>'}
                    </CalendarHeaderButton>
                </CalendarHeader>
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
        );
    }
}

const mapStateToProps = state => ({
    currentMonthRange: state.currentMonthRange,
});

const mapDispatchToProps = dispatch => ({
    onSetCurrentMonthRange: date => dispatch(actions.setCurrentMonthRange(date)),
    onSetNextMonthRange: range => dispatch(actions.setNextMonthRange(range)),
    onSetPrevMonthRange: range => dispatch(actions.setPrevMonthRange(range)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Calendar);
