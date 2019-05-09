import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from './UI/Button';
import * as actions from '../store/actions';

class ReminderForm extends Component {
    state = {
        reminder: {
            title: '',
            time: '',
            colour: '',
        },
    };

    inputChangedHandler = (event, id) => {
        const reminder = {
            ...this.state.reminder,
            [id]: event.target.value,
        };
        this.setState({
            reminder,
        });
    };

    createReminder = () => {
        this.props.onCreateReminder(this.props.dayId, this.state.reminder);
    };

    render() {
        return (
            <Backdrop show={this.props.show}>
                <Modal>
                    <CloseButton onClick={this.props.closeModal}>x</CloseButton>
                    <Form>
                        <h3>Add reminder</h3>
                        <label htmlFor='title'>
                            <span>Reminder title</span>
                            <input
                                onChange={event => this.inputChangedHandler(event, 'title')}
                                type='text'
                                id='title'
                                placeholder='Pick up the kids'
                                value={this.state.reminder.title}
                            />
                        </label>
                        <label htmlFor='time'>
                            <span>Time</span>
                            <input
                                onChange={event => this.inputChangedHandler(event, 'time')}
                                type='time'
                                id='time'
                                value={this.state.reminder.time}
                            />
                        </label>
                        <label htmlFor='colour'>
                            <span>Colour</span>
                            <input
                                onChange={event => this.inputChangedHandler(event, 'colour')}
                                type='color'
                                id='colour'
                                value={this.state.reminder.colour}
                            />
                        </label>
                        <button type='button' onClick={this.createReminder}>
                            Submit
                        </button>
                    </Form>
                </Modal>
            </Backdrop>
        );
    }
}

const Form = styled.form`
    padding: 50px;
    display: flex;
    flex-direction: column;
    place-items: center center;
    > label {
        display: block;
        input,
        span {
            display: block;
        }
    }
`;

const Modal = styled.div`
    position: fixed;
    z-index: 500;
    background-color: #dfdfe9;
    box-shadow: 1px 1px 9px 3px #000000ad;
    width: 50%;
    height: 50%;
    padding: 16px;
    margin: auto;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    transition: all 0.3s ease-out;
    display: flex;
    justify-content: center;
    place-items: center center;
`;

const Backdrop = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: ${props => (props.show ? 'auto' : 'none')};
`;

const CloseButton = styled(Button)`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: tomato;
    &:hover {
        background-color: #ff4747;
    }
`;

const mapDispatchToProps = dispatch => ({
    onCreateReminder: (dayId, reminder) => dispatch(actions.createReminder(dayId, reminder)),
});

export default connect(
    null,
    mapDispatchToProps
)(ReminderForm);
