var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId= Schema.ObjectId;
var holidaysDetailsSchema = new Schema({
						"name": { type: String, Default:'' },
                        "startDate":{ type: Date, Default:'' },
                        "endDate":{ type:Date, Default:''},
                        "everyYear": { type:Boolean,Default:false}
                         })
mongoose.model('holidaysDetails',holidaysDetailsSchema);

exports.holidaysDetails = mongoose.model('holidaysDetails');
