# Mongo/Mongoose Animals database
## Mongo Half Stack app built as a student exercise for Alchemy Code Lab

## Author: Charly Welch
<blwbiology@gmail.com>

## Description
Save animals to a mongo database. Animals have the following schema:
- common // common name
- binomial // scientific name, nested
    - genus
    -species
- habitat // choices: marine, aquatic, terrestrial, canopy
- features // array of strings
- _id added by Mongo

### Available methods:
Standard crud methods are available as well as queries to the database. (ex: `/animals?common=Giant Squid`)

## Dependencies:
- chai
- chai-http
- eslint
- mocha
- nodemon
- dotenv
- express
- mongoose