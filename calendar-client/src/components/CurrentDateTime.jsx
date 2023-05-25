import React, { useState, useEffect } from 'react';

const CurrentDateTime = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    // Months are zero-based, so we add one to get the current month number
    const month = currentTime.getMonth() + 1;
    const day = currentTime.getDate();
    const year = currentTime.getFullYear();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    return (
        <span>
            {`${hours}:${minutes}`} - {`${month}/${day}/${year}`}
        </span>
    );
};

export default CurrentDateTime;
