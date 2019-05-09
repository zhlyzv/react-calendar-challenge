import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { isToday, getDay, format } from 'date-fns';
import uuid from 'uuid';
import styled from 'styled-components';
import * as actions from '../store/actions';
import Day from './Day';
import Reminder from './Reminder';
import ReminderForm from './ReminderForm';

class Month extends Component {
    state = {
        reminderFormOpen: false,
        dayId: null,
    };

    toggleReminderForm = dayId => {
        this.setState({
            reminderFormOpen: !this.state.reminderFormOpen,
            dayId,
        });
    };

    render() {
        let days = null;
        const { range, onUpdateReminder, onDeleteReminder } = this.props;
        if (range.length) {
            const padding = Array(getDay(range[0].date)).fill(null);
            const paddedRange = [...padding, ...range];
            days = paddedRange.map(day => {
                if (day) {
                    const formattedDay = format(day.date, 'D');
                    const reminders = day.reminders.map(r => (
                        <Reminder
                            updateReminder={onUpdateReminder}
                            deleteReminder={onDeleteReminder}
                            key={uuid()}
                            title={r.title}
                            colour={r.colour}
                            time={r.time}
                        />
                    ));
                    return (
                        <Day
                            createReminder={() => this.toggleReminderForm(day.id)}
                            key={day.id}
                            isToday={isToday(day.date)}
                        >
                            {formattedDay}
                            {reminders}
                        </Day>
                    );
                }
                // empty component
                return <Day empty key={uuid()} />;
            });
        }
        return (
            <Fragment>
                <ReminderForm
                    closeModal={this.toggleReminderForm}
                    show={this.state.reminderFormOpen}
                    dayId={this.state.dayId}
                />
                <Wrapper>{days}</Wrapper>
            </Fragment>
        );
    }
}

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 200px);
`;

const mapDispatchToProps = dispatch => ({
    onUpdateReminder: (dayId, reminder) => dispatch(actions.updateReminder(dayId, reminder)),
    onDeleteReminder: (dayId, reminder) => dispatch(actions.deleteReminder(dayId, reminder)),
});

export default connect(
    null,
    mapDispatchToProps
)(Month);
