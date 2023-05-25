const checkIfDatesAreValid = (start, end) => {
    let startDate = new Date(start).getTime();
    let endDate = new Date(end).getTime();
    if (endDate < startDate) {
        alert('End date cannot be before start date');
        return false;
    }
    if (startDate === endDate) {
        alert('Start date and end date cannot be the same');
        return false;
    }
    if (startDate < Date.now() || endDate < Date.now()) {
        alert('Date cannot be in the past');
        return false;
    }

    return true;
};

export default checkIfDatesAreValid;
