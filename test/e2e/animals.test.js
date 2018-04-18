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
        return new Animal(squid).save()
            .then(saved => {
                saved = saved.toJSON();
                const { _id, __v, common } = saved;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.ok(common);
                assert.deepEqual(saved, {
                    _id, __v, common,
                    ...squid
                });
                squid = saved;
                return Animal.findById(saved._id).lean();
            })
            .then(found => assert.deepEqual(found, squid));
    });
});