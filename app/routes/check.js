const express = require('express');
const router = express.Router();

/**
 * Route for /check (POST only)
 */
router.post('/', function (req, res) {
    //Let's get the Rquest
    let appRequest = req.body;

    // Check if the app request is valid and contains components
    if (!appRequest.hasOwnProperty('components')) {
        return res.status(405).json({error: 'Invalid input'})
    }

    // Check if we are able to fulfill the request
    // TODO: Implement depending on your server setup


    // Sample response object
    let serverResponse = {
        fulfillable: true,
        components: [
            {
                name: 'PHP',
                value: '7.2.9'
            },
            {
                name: 'mysql',
                value: '5.7.25'
            },
        ],
    };

    res.json(serverResponse);
});

module.exports = router;
