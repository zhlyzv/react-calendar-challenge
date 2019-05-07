import React, { Component } from 'react';
import moment from 'moment';

class CalendarMonth extends Component {
    constructor(props) {
        super(props);
        this.renderWeeks = this.renderWeeks.bind(this);
    }

    renderWeeks(week, index) {
        const { month, actions } = this.props;

        const today = moment();
    }


}

export default CalendarMonth;