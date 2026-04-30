// TEMPORARY TEST ROUTES - Remove in production
const express = require('express');
const { createTestAdmin, createTestUser } = require('../controllers/authController.test');

const router = express.Router();

router.post('/create-admin', createTestAdmin);
router.post('/create-user', createTestUser);

module.exports = router;
