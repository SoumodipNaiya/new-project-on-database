const mongoose = require('mongoose');
const test_schema = new mongoose.Schema({
    type: String,
    features: Array
},
{collection:"geojson"}
);

/*const mongoose = require('mongoose');
const test_schema = new mongoose.Schema({
    type: String,
    features: Array
},{collection: "district"});*/

let geomodel = module.exports = mongoose.model('geomodel', test_schema);