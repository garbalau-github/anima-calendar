const router = require('express').Router();
const Event = require('../models/Event');
const handleEventErrors = require('../utils/handleEventErrors');

router.get('/', async (_req, res) => {
    const events = await Event.find({});
    try {
        res.status(200).json(events);
    } catch (err) {
        handleEventErrors(err, res);
    }
});

router.get('/:id/show', async (req, res) => {
    const id = req.params.id;
    const event = await Event.findById(id);
    try {
        res.status(200).json(event);
    } catch (err) {
        handleEventErrors(err, res);
    }
});

router.post('/', (req, res) => {
    const newEvent = new Event(req.body);
    try {
        newEvent.save((err, event) => {
            if (err) {
                handleEventErrors(err, res);
            } else {
                res.status(200).json(event);
            }
        });
    } catch (err) {
        handleEventErrors(err, res);
    }
});

router.put('/:id/update', async (req, res) => {
    const id = req.params.id;
    try {
        const event = await Event.findOne({ _id: id });
        if (!event) {
            res.status(404).json({ error: `Event not found: ${id}` });
        } else {
            Object.assign(event, req.body);
            event.save((err, event) => {
                if (err) {
                    handleEventErrors(err, res);
                } else {
                    res.status(200).json(event);
                }
            });
        }
    } catch (err) {
        handleEventErrors(err, res);
    }
});

router.delete('/:id/delete', async (req, res) => {
    const id = req.params.id;
    try {
        await Event.findByIdAndRemove(id);
        res.status(200).json(`Deleted: ${id}`);
    } catch (err) {
        handleEventErrors(err, res);
    }
});

module.exports = router;
