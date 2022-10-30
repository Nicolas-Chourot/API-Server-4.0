//http://rali.iro.umontreal.ca/rali/?q=fr/DEM-json

const Model = require('./model');
module.exports =
    class Word extends Model {
        constructor() {
            super();
            this.Val = "";
            this.Def = "";
            this.Con = "";
            this.Dom = "";
            this.Gen = "";
            this.addValidator('Val', 'string');
            this.addValidator('Def', 'string');
            this.addValidator('Con', 'string');
            this.addValidator('Dom', 'string');
            this.addValidator('Gen', 'string');
        }
    }