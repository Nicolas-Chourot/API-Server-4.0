const Repository = require('../models/repository');
const WordModel = require('../models/word');

module.exports =
    class WordsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext, new Repository(new WordModel()));
        }
    }