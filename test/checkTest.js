const helper = require('./base');

// Supertest API Wrapper
const api = helper.api;
const path = helper.config.prefix + '/check';


/**
 * Test suite for /check
 *
 * Define a list of desired changes using abstract constraints.
 * Server should process these constraints, check if they can be fulfilled
 * and respond with the possible resolutions
 *
 * @see https://github.com/asmprotocol/asmp/blob/master/check.plantuml
 */
describe('POST /check', () => {
    it('Should throw an 405 error if the input is invalid', async () => {
        let request = "invalid";

        let result = await api
            .post(path)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(JSON.stringify(request));

        result.statusCode.should.equal(405);
    });

    it('Should throw an 405 error if the input has no components', async () => {
        let request = {};

        let result = await api
            .post(path)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(JSON.stringify(request));

        result.statusCode.should.equal(405);
    });

    it('Should return to an valid request', async () => {
        // Sample check request from an potential application
        let request = {
            components: [
                // Constraint within a PHP version
                {
                    name: 'PHP',
                    constraints: [
                        {'>=': '7.0.0',},
                        {'<': '7.3.0',},
                    ],
                },
                // More complex constraint for multiple supported databases,
                // priority / preference is defined by ordering
                [
                    {
                        name: 'mysql',
                        constraints: [
                            {'>=': '5.5.0',},
                            {'<': '8.0.0',},
                        ],
                    },
                    {
                        name: 'mariadb',
                        constraints: [
                            {'>=': '10.0.0',},
                            {'<': '11.0.0',},
                        ],
                    },
                ],
            ]
        };

        let result = await api
            .post(path)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(JSON.stringify(request));

        result.statusCode.should.equal(200);
        result.body.should.be.a('object');
        result.body.fulfillable.should.equal(true);
        result.body.components.should.a('array');
    });
});
