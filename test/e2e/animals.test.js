const { assert } = require('chai');
const request = require('./request');
const Animal = require('../../lib/models/Animal');
const { dropCollection } = require('./db');

describe('Animals API', () => {
    before(() => dropCollection('animals'));


});