const { assert } = require('chai');
const request = require('./request');
const Animal = require('../../lib/models/Animal');
const { dropCollection } = require('./db');

describe('Animals API', () => {
    before(() => dropCollection('animals'));

    let squid = {
        common: 'Giant Squid',
        binomial: {
            genus: 'Architeuthis',
            species: 'dux',
        },
        habitat: 'marine',
        features: ['tentacles', 'beak', 'siphon']
    };
    let sloth = {
        common: 'Three Toed Sloth',
        binomial: {
            genus: 'Bradypus',
        },
        habitat: 'terrestrial',
        features: ['slow', 'cute', 'nine cervical vertebrae']
    };

    it('saves and gets an animal', () => {
        return request.post('/animals')
            .send(squid)
            .then(({ body }) => {
                const { _id, __v, common } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.ok(common);
                assert.deepEqual(body, {
                    _id, __v, common,
                    ...squid
                });
                squid = body;
            });
    });

    const roundTrip = doc => JSON.parse(JSON.stringify(doc.toJSON()));

    it('gets an animal by id', () => {
        return Animal.create(sloth).then(roundTrip)
            .then(saved => {
                sloth = saved;
                return request.get(`/animals/${sloth._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, sloth);
            });
    });

    it('updates an animal', () => {
        sloth.habitat = 'canopy';

        return request.put(`/animals/${sloth._id}`)
            .send(sloth)
            .then(({ body }) => {
                assert.deepEqual(body, sloth);
                return Animal.findById(sloth._id)
                    .then(roundTrip);
            })
            .then(updated => {
                assert.deepEqual(updated, sloth);
            });
    });

    const getFields = ({ _id, common, binomial, habitat }) => ({ _id, common, binomial, habitat });

    it('gets all animals and returns _id, common, genus, and habitat', () => {
        return request.get('/animals')
            .then(({ body }) => {
                assert.deepEqual(body, [squid, sloth].map(getFields));
            });
    });

    it('queries animals', () => {
        return request.get('/animals?common=Giant Squid')
            .then(({ body }) => {
                assert.deepEqual(body, [squid].map(getFields));
            });
    });

    it('deletes an animal', () => {
        return request.delete(`/animals/${squid._id}`)
            .then(() => {
                return Animal.findById(squid._id);
            })
            .then(found => {
                assert.isNull(found);
            });
    });

    it('returns 404 not found for nonexistent id', () => {
        return request.get(`/animals/${squid._id}`)
            .then(response => {
                assert.equal(response.status, 404);
                assert.match(response.body.error, /^Animal with/);
            });
    });
});