const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    start: {
        type: Date,
        required: [true, 'Start time is required'],
        min: [new Date(), "Sorry, event can't be in the past"],
    },
    end: {
        type: Date,
        required: [true, 'End time is required'],
        min: [new Date(), "Sorry, event can't be in the past"],
        default: function () {
            const date = new Date(this.start);
            return date.setDate(date.getDate() + 1);
        },
    },
    describe: {
        type: String,
    },
});

module.exports = mongoose.model('Event', EventSchema);
