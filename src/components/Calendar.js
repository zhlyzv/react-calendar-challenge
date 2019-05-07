import React, { Component } from 'react';
import CalendarHeader from './CalendarHeader';

class Calendar extends Component {
    render() {
        return (
            <div className='calendar'>
                <CalendarHeader />
                Hello from calendar component
                {this.today}
            </div>
        );
    }
}

export default Calendar;
