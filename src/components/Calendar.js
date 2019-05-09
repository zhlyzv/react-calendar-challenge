import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import WeekDays from './WeekDays';
import CalendarHeader from './CalendarHeader';
import Month from './Month';

class Calendar extends Component {
    render() {
        const { onSetNextMonth, onSetPrevMonth, currentMonth } = this.props;
        return (
            <div>
                <CalendarHeader
                    next={onSetNextMonth}
                    prev={onSetPrevMonth}
                    date={currentMonth[0].date}
                />
                <WeekDays />
                <Month range={currentMonth} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentMonth: state.month,
});

const mapDispatchToProps = dispatch => ({
    onSetNextMonth: () => dispatch(actions.setNextMonth()),
    onSetPrevMonth: () => dispatch(actions.setPrevMonth()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Calendar);
