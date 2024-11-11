const express = require('express');
const mongoose = require('mongoose');
const Hostel = require('../models/hostels'); // Corrected path

const router = express.Router();

// Get all hostels
router.get('/', async (req, res) => {
    try {
        const hostels = await Hostel.find();
        res.json(hostels);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get a specific hostel by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const hostel = await Hostel.findById(id);

        if (!hostel) {
            return res.status(404).json({ error: 'Hostel not found' });
        }

        res.json(hostel);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;