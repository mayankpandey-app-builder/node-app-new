var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;
var ObjectId1= Schema.ObjectId;

var companySchema = mongoose.Schema({
    createdOn: Number,
    name: {
        displayValue: {type: String, default: ''},
        lowerCaseValue: {type: String, default: ''}
    },
    imageURL: String,
    organization: { type: Schema.Types.ObjectId, ref: 'Organization' },
    contacts: [{ type: Schema.Types.ObjectId, ref: 'Contact'}],
    revenue: {
        amount: Number,
        currency: String
    },
    numberOfEmployees: Number,
    industry: String,
    contactInformation: [{
        contactType: String,
        contactValue: String
    }],
    addresses: [{
        addressType: String,
        addressValue: String,
        contactInformation: [{
            contactType: String,
            contactValue: String
        }]
    }],
    country: {type: String, default: ''},
    namedAccount: {type: Boolean, default: false},
    solutionArea: { 
        selectedValues: { type: [String], default: []},
        possibleValues: { type: [String], default: []}
    },
    about: {
        text: { type: String, default: '' },
        defaultText: { type: String, default: '' }
    },
    website: { type: String, default: '' },
    companyType: { type: [String], default: [] },
    isSandbox: {type: Boolean, default: false},
    externalId :{ type: String, default: ''}
});


mongoose.model('company',companySchema);

exports.company = mongoose.model('company');