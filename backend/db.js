const pgp = require('pg-promise')()
require('dotenv').config({path: '../.env'})


const {
    POSTGRES_PASSWORD
} = process.env;

// const url = 'postgres://postgres:' + POSTGRES_PASSWORD + '@db/polyfolio'
const url = 'postgres://postgres:' + POSTGRES_PASSWORD + '@localhost:5432/polyfolio'

console.log(url)

const db = pgp(url)

module.exports = db