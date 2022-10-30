const ImagesRepository = require('../models/imagesRepository');
module.exports = 
class ImagesController extends require('./Controller') {
    constructor(HttpContext){
        super(HttpContext, new ImagesRepository());
    }
}