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

        assert.isUndefined(animal.validateSync());
    });

    const getValidationErrors = validation => {
        assert.isDefined(validation, 'expected to encounter errors but got none');
        return validation.errors;
    };

    it('requires required fields', () => {
        const animal = new Animal({});
        const errors = getValidationErrors(animal.validateSync());
        assert.equal(errors.common.kind, 'required');
        assert.equal(errors['binomial.genus'].kind, 'required');
        assert.equal(errors.habitat.kind, 'required');
    });

    it('habitat must be enum', () => {
        const animal = new Animal({
            common: 'Trash Panda',
            binomial: {
                genus: 'Procyon',
                species: 'lotor'
            },
            habitat: 'garbage can',
            features: ['striped tail', 'mischievous eyes', 'bad attitude']
        });
        const errors = getValidationErrors(animal.validateSync());
        assert.equal(errors['habitat'].kind, 'enum');
    });
});