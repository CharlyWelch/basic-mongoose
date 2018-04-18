const mongoose = require('mongoose');
const { Schema } = mongoose;

const RequiredString = {
    type: String,
    required: true
};

const schema = new Schema({
    common: RequiredString,
    binomial: {
        genus: RequiredString,
        species: String
    },
    habitat: {
        ...RequiredString,
        enum: ['marine', 'terrestrial', 'aquatic']
    },
    features: [String]
});

module.exports = mongoose.model('Animal', schema);