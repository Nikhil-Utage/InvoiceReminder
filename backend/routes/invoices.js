const express = require('express');
const router = express.Router();
const db = require('../db');
const axios = require('axios');

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'Unauthorized' });
}

router.get('/due-invoices', async (req, res) => {
    try {
        const dueInvoices = await db.getDueInvoices();
        console.log('Due Invoices Retrieved:', dueInvoices);
        res.json(dueInvoices);
    } catch (error) {
        console.error('Error fetching due invoices:', error);
        res.status(500).json({ error: 'Failed to fetch due invoices' });
    }
});

// Add a route to create new invoices
router.post('/create', async (req, res) => {
    try {
        const invoiceData = req.body;
        const newInvoice = await db.createInvoice(invoiceData);
        // Trigger Zapier webhook with new invoice data
        await axios.post('https://hooks.zapier.com/hooks/catch/21016401/2sg4b83/', newInvoice);
        res.status(201).json(newInvoice);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create invoice' });
    }
});

module.exports = router;