const PostModel = require('../models/post');
const Repository = require('../models/repository');
module.exports =
    class PostsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext, new Repository(new PostModel()));
        }
    }