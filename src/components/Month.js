import React, { Component, Fragment } from 'react';
import { isToday, getDay, format } from 'date-fns';
import uuid from 'uuid';
import styled from 'styled-components';
import Day from './Day';
import Reminder from './Reminder';
import ReminderForm from './ReminderForm';

class Month extends Component {
    state = {
        reminderFormOpen: false,
        dayId: null,
        reminder: null,
    };

    toggleReminderForm = dayId => {
        this.setState({
            reminderFormOpen: !this.state.reminderFormOpen,
            dayId,
        });
        if (this.state.reminder) {
            // reset reminder prop so ReminderForm opens fresh next time
            this.setState({ reminder: null });
        }
    };

    openReminderForm = (dayId, reminder) => {
        this.setState({ reminder });
        this.toggleReminderForm(dayId);
    };

    render() {
        let days = null;
        const { range } = this.props;
        if (range.length) {
            const padding = Array(getDay(range[0].date)).fill(null);
            const paddedRange = [...padding, ...range];
            days = paddedRange.map(day => {
                if (day) {
                    const formattedDay = format(day.date, 'D');
                    const reminders = day.reminders.map(r => (
                        <Reminder
                            openReminderForm={() => this.openReminderForm(day.id, r)}
                            key={r.id}
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
                            <Reminders>{reminders}</Reminders>
                        </Day>
                    );
                }
                // empty component
                return <Day empty key={uuid()} />;
            });
        }
        let reminderForm = null;
        if (this.state.reminderFormOpen) {
            reminderForm = (
                <ReminderForm
                    closeModal={this.toggleReminderForm}
                    show={this.state.reminderFormOpen}
                    dayId={this.state.dayId}
                    reminder={this.state.reminder}
                />
            );
        }
        return (
            <Fragment>
                {reminderForm}
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

const Reminders = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`;

export default Month;
