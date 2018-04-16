'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PrintersSchema = new Schema({
    cssId: String,
    printerName: String,
    url: String,
    apiKey: String
});

module.exports = mongoose.model('Printer', PrintersSchema);
