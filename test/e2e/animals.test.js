const { assert } = require('chai');
const request = require('./request');
const Animal = require('../../lib/models/Animal');
const { dropCollection } = require('./db');

describe('Animals API', () => {
    before(() => dropCollection('animals'));

    const squid = {
        common: 'Giant Squid',
        binomial: {
            genus: 'Architeuthis',
            species: 'dux',
        },
        habitat: 'marine',
        features: ['tentacles', 'beak', 'siphon']
    };
    const sloth = {
        common: 'Three Toed Sloth',
        binomial: {
            genus: 'Bradypus',
        },
        habitat: 'terrestrial',
        features: ['slow', 'cute', 'nine cervical vertebrae']
    };

    it('saves and gets an animal', () => {
        return new Animal(squid).save()
            .then(saved => {
                saved = saved.toJSON();
                const { _id, __v, common } = saved;
                assert.ok(_id);
                assert.equal(__v, 0);
            });
    });
});