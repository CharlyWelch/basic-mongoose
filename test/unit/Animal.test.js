const { assert } = require('chai');
const Animal = require('../../lib/models/Animal');

describe('Animal model', () => {

    it('is a valid model', () => {
        const data = {
            common: 'giant squid',
            binomial: {
                genus: 'Architeuthis',
                species: 'dux',
            },
            habitat: 'marine',
            features: ['tentacles', 'beak', 'siphon']
        };

        const animal = new Animal(data);

        assert.deepEqual(animal.toJSON(), { _id: animal._id, ...data });

    });
});