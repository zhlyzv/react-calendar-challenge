import React from 'react';
import { isToday, getDay, format } from 'date-fns';
import styled from 'styled-components';
import Day from './Day';

const Month = props => {
    let days = null;
    if (props.range.length) {
        const padding = Array(getDay(props.range[0])).fill(null);
        const paddedRange = [...padding, ...props.range];
        days = paddedRange.map(day => {
            if (day) {
                const formattedDay = format(day, 'D');
                return (
                    <Day key={day.toISOString()} isToday={isToday(day)}>
                        {formattedDay}
                    </Day>
                );
            }
            // This isn't really random 🤷‍
            return <Day key={Math.random()} />;
        });
    }
    return <Wrapper>{days}</Wrapper>;
};

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 200px);
`;

export default Month;
