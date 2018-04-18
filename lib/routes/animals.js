const router = require('express').Router();
const Animal = require('../models/Animal');
const errorHandler = require('../error-handler');

module.exports = router 
    .post('/', (req, res) => {
        Animal.create(req.body)
            .then(animal => res.json(animal))
            .catch(err => errorHandler(err, req, res));
    })
    