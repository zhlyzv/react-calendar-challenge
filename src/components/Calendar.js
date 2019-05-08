import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import WeekDays from './WeekDays';
import CalendarHeader from './CalendarHeader';
import Month from './Month';

class Calendar extends Component {
    componentWillMount() {
        this.props.onSetCurrentMonthRange(new Date());
    }

    render() {
        return (
            <div>
                <CalendarHeader
                    next={() => this.props.onSetNextMonthRange(this.props.currentMonthRange)}
                    prev={() => this.props.onSetPrevMonthRange(this.props.currentMonthRange)}
                    date={this.props.currentMonthRange[0]}
                />
                <WeekDays />
                <Month range={this.props.currentMonthRange} />
            </div>
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
