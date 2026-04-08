const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Event, Participant, User } = require('./models');


// AUTHENTIFICATION
router.post('/token', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ detail: "Utilisateur introuvable." });
        }

        // Vérification directe sans cryptage !
        if (password !== user.password) {
            return res.status(401).json({ detail: "Mot de passe incorrect." });
        }

        // On renvoie un token valide (le front l'attend dans "access")
        const token = jwt.sign({ userId: user.id, username: user.username }, 'super_secret', { expiresIn: '24h' });
        res.json({ access: token }); 

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// EVENTS
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


// PARTICIPANTS
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