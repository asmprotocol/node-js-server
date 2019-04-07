/**
 * Sample server application for the Application Server Management protocol (asmprotocol)
 *
 * https://github.com/asmprotocol/asmp
 */

const express = require('express');
const routes = require('./routes');

const prefix = '/v1';

const app = express();

// We use JSON for requests and responses
app.use(express.json());

// Basic usage message
app.use('/', routes.start);

// Check for possible updates by the application
app.use(prefix + '/check', routes.check);

// Change request from the application
app.use(prefix + '/change', routes.change);

// Rollback of an change
app.use(prefix + '/rollback', routes.rollback);

// Status query
app.use(prefix + '/status', routes.status);

// You can specify the port the environment variable ASMP_PORT
let port = process.env.ASMP_PORT || 3000;

// A generic error handler for broken inputs
app.use(function (err, req, res, next) {
    console.error(err.stack);

    if (!res.headersSent) {
        res.status(405);
        res.json({error: 'Invalid input'});
    }
});

app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`),
);

