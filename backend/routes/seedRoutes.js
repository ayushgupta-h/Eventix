const express = require('express');
const { seedEvents, clearEvents } = require('../controllers/seedController');

const router = express.Router();

// Seed sample events
router.post('/events', seedEvents);

// Clear all events
router.delete('/events', clearEvents);

module.exports = router;
