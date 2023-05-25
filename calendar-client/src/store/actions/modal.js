export const openModal = () => {
    return {
        type: 'OPEN_MODAL',
        payload: true,
    };
};

export const closeModal = () => {
    return {
        type: 'CLOSE_MODAL',
        payload: false,
    };
};

export const closeEvent = () => {
    return {
        type: 'CLOSE_EVENT',
    };
};
