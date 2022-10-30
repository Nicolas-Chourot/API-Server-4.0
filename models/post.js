//http://rali.iro.umontreal.ca/rali/?q=fr/DEM-json

const Model = require('./model');
module.exports =
    class Post extends Model {
        constructor() {
            super();
            this.Category = "";
            this.Title = "";
            this.Text = "";
            this.ImageUrl = "";
            this.Date = "";
            this.addValidator('Category', 'string');
            this.addValidator('Title', 'string');
            this.addValidator('Text', 'string');
            this.addValidator('ImageUrl', 'url');
            this.addValidator('Date', 'integer');
        }
    }