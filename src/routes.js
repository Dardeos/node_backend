const express = require('express');
const router = express.Router();
const { Event, Participant } = require('./models');

// STATS
router.get('/stats', async (req, res) => {
    try {
        const total    = await Event.count();
        const upcoming = await Event.count({ where: { status: 'upcoming' } });
        const ongoing  = await Event.count({ where: { status: 'ongoing' } });
        const finished = await Event.count({ where: { status: 'finished' } });
        res.json({ total, upcoming, ongoing, finished });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// EVENTS
router.get('/events', async (req, res) => {
    try {
        res.json(await Event.findAll());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/events', async (req, res) => {
    try {
        res.status(201).json(await Event.create(req.body));
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/events/:id', async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) return res.status(404).json({ error: 'Event not found' });
        res.json(await event.update(req.body));
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

// PARTICIPANTS
router.get('/participants', async (req, res) => {
    try {
        res.json(await Participant.findAll());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/participants', async (req, res) => {
    try {
        res.status(201).json(await Participant.create(req.body));
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;