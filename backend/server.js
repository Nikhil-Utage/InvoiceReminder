const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors'); // Import cors

require('./config/passport'); // Import Passport configuration

const authRoutes = require('./routes/auth');
const invoiceRoutes = require('./routes/invoices');
const automationRoutes = require('./routes/automation');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Frontend origin
    credentials: true // Allow credentials (cookies)
}));

app.use(express.json()); // Ensure this middleware is present

app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/invoices', invoiceRoutes);
app.use('/automation', automationRoutes);

app.listen(5000, () => console.log('Backend running on port 5000'));