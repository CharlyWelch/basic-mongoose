const router = require('express').Router();
const Animal = require('../models/Animal');
const errorHandler = require('../error-handler');

module.exports = router 
    .post('/', (req, res) => {
        Animal.create(req.body)
            .then(animal => res.json(animal))
            .catch(err => errorHandler(err, req, res));
    })
    .get('/:id', (req, res) => {
        const { id } = req.params;
        Animal.findById(id)
            .lean()
            .then(animal => {
                if(!animal) {
                    errorHandler({
                        status: 404,
                        error: `Animal with id ${id} does not exist`
                    }, req, res);
                }
                else res.json(animal);
            })
            .catch(err => errorHandler(err, req, res));
    })
    .put('/:id', (req, res) => {
        Animal.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
            .then(animal => res.json(animal))
            .catch(err => errorHandler(err, req, res));
    })