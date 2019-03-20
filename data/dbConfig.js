const knex = require('knex')

dbenv = process.env.DBENV || 'development'

const knexConfig = require('../knexfile.js')[dbenv]

module.exports = knex(knexConfig)