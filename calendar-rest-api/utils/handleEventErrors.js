const handleEventErrors = (error, res) => {
    const schemaErrors = {
        title: '',
        start: '',
        end: '',
    };

    if (error.errors) {
        Object.values(error.errors).forEach((error) => {
            schemaErrors[error.properties.path] = error.properties.message;
        });
        return res.status(500).json(schemaErrors);
    } else if (error.code == 11000) {
        let duplicate = Object.keys(error.keyPattern)[0];
        schemaErrors[duplicate] = `Duplicate: ${duplicate}! Try again!`;
        return res.status(500).json(schemaErrors);
    } else {
        return res.status(500).json('Something went wrong!');
    }
};

module.exports = handleEventErrors;
