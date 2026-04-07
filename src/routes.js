const express = require('express');
const router = express.Router();
const { Event, Participant } = require('./models');

// Events
router.get('/events', async (req, res) => {
    try {
        const events = await Event.findAll();
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/events', async (req, res) => {
    try {
        const event = await Event.create(req.body);
        res.status(201).json(event);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/events/:id', async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) return res.status(404).json({ error: 'Event not found' });
        await event.update(req.body);
        res.json(event);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/events/:id', async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) return res.status(404).json({ error: 'Event not found' });
        await event.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Participants
router.get('/participants', async (req, res) => {
    try {
        const participants = await Participant.findAll();
        res.json(participants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/participants', async (req, res) => {
    try {
        const participant = await Participant.create(req.body);
        res.status(201).json(participant);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;