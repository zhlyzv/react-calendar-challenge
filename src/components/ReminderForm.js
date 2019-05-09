import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import uuid from 'uuid';
import Button from './UI/Button';
import * as actions from '../store/actions';

class ReminderForm extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            reminder: {
                title: '',
                time: '',
                colour: '',
                id: '',
            },
        };
        this.state = this.initialState;
    }

    componentDidMount() {
        // initialize state for reminder from props if editing
        if (this.props.reminder) {
            this.setState({ reminder: this.props.reminder });
        }
    }

    inputChangedHandler = (event, id) => {
        const reminder = {
            ...this.state.reminder,
            [id]: event.target.value,
        };
        this.setState({ reminder });
    };

    createReminder = () => {
        this.props.onCreateReminder(this.props.dayId, {
            ...this.state.reminder,
            id: uuid(),
        });
        // reset state after creating reminder
        this.setState(this.initialState);
        this.props.closeModal();
    };

    updateReminder = () => {
        this.props.onUpdateReminder(this.props.dayId, this.state.reminder);
        this.setState(this.initialState);
        this.props.closeModal();
    };

    deleteReminder = () => {
        this.props.onDeleteReminder(this.props.dayId, this.state.reminder);
        this.setState(this.initialState);
        this.props.closeModal();
    };

    reminderFormHandler = () => {
        // if opened in 'edit' mode
        if (this.props.reminder) {
            this.updateReminder();
        } else {
            this.createReminder();
        }
    };

    setReminderColour = colour => {
        this.setState({
            reminder: {
                ...this.state.reminder,
                colour,
            },
        });
    };

    render() {
        const colours = ['#2643a6', '#cb496e', '#c45fcb', '#b67f5c'];

        return (
            <Backdrop>
                <Modal>
                    <CloseButton onClick={this.props.closeModal}>x</CloseButton>
                    <Form>
                        <h3>Add new reminder</h3>
                        <label className='element-wrapper' htmlFor='title'>
                            <span>Reminder title</span>
                            <input
                                onChange={event => this.inputChangedHandler(event, 'title')}
                                type='text'
                                id='title'
                                placeholder='Add a title'
                                value={this.state.reminder.title}
                            />
                        </label>
                        <label className='element-wrapper' htmlFor='time'>
                            <span>Time</span>
                            <input
                                onChange={event => this.inputChangedHandler(event, 'time')}
                                type='time'
                                id='time'
                                value={this.state.reminder.time}
                            />
                        </label>
                        <div className='element-wrapper'>
                            <span>Choose reminder colour</span>
                            <CircleWrapper>
                                {colours.map(colour => (
                                    <Circle
                                        type='button'
                                        onClick={() => this.setReminderColour(colour)}
                                        colour={colour}
                                        key={colour}
                                    />
                                ))}
                            </CircleWrapper>
                        </div>
                        <SubmitButton type='button' onClick={this.reminderFormHandler}>
                            Submit
                        </SubmitButton>
                        {this.props.reminder ? (
                            <DeleteButton type='button' onClick={this.deleteReminder}>
                                Delete
                            </DeleteButton>
                        ) : null}
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
    > .element-wrapper {
        display: block;
        margin-bottom: 10px;
        input,
        span {
            display: block;
            margin-bottom: 15px;
        }
        input {
            min-width: 300px;
            color: #000;
            border: 1px solid #f3f3f3;
            padding: 10px 14px;
            line-height: normal;
            letter-spacing: inherit;
            border-radius: 0;
            box-shadow: none;
            background-color: #f3f3f3;
        }
    }
`;

const SubmitButton = styled(Button)`
    border-radius: 2px;
    font-size: 1rem;
    padding: 15px 20px;
    line-height: auto;
    height: auto;
    letter-spacing: 2px;
    margin-bottom: 10px;
    width: 200px;
`;

const DeleteButton = styled(SubmitButton)`
    background-color: tomato;
    &:hover {
        background-color: red;
    }
`;

const Modal = styled.div`
    position: fixed;
    z-index: 999;
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
    transition: all 0.5s ease-in-out;
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
    transition: all 5s ease-in-out;
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

const Circle = styled(Button)`
    background-color: ${props => props.colour};
    width: 36px;
    &:hover {
        background-color: ${props => props.colour};
    }
`;

const CircleWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 20px;
`;
const mapDispatchToProps = dispatch => ({
    onCreateReminder: (dayId, reminder) => dispatch(actions.createReminder(dayId, reminder)),
    onUpdateReminder: (dayId, reminder) => dispatch(actions.updateReminder(dayId, reminder)),
    onDeleteReminder: (dayId, reminder) => dispatch(actions.deleteReminder(dayId, reminder)),
});

export default connect(
    null,
    mapDispatchToProps
)(ReminderForm);
