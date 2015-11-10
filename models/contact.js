var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId= Schema.ObjectId;
var contactSchema = mongoose.Schema({
	createdOn: Number, 
	firstName: {
		displayValue: {type: String, default: ''},
		lowerCaseValue: {type: String, default: ''}
	},
	lastName: {
		displayValue: {type: String, default: ''},
		lowerCaseValue: {type: String, default: ''}
	},
    gender: {type: String, default: ''},
	sharedWith: [{type: Schema.Types.ObjectId, ref: 'Member'}],
	company: String,
	position: String,
	hierarchicalPosition: {
		comments: {type: String, default: ''},
		selectedValue: {type: String, default: ''},
		explanatoryText: {type: String, default: ''},
		possibleValues: {type: [String], default: []},
	},
	contactType: {
		comments: {type: String, default: ''},
		selectedValue: {type: String, default: ''},
		explanatoryText: {type: String, default: ''},
		possibleValues: {type: [String], default: []},
	},
	role: {
		comments: {type: String, default: ''},
		selectedValue: {type: String, default: ''},
		explanatoryText: {type: String, default: ''},
		possibleValues: {type: [String], default: []},
	},
	department: String,
	country: String,
	imageURL: String,
	contactInformation: [{
		contactType: String,
		contactValue: String
	}],
	organization: { type: Schema.Types.ObjectId, ref: 'Organization' },
	socialNetworks: [{
		// The name of the social profile network.
		// Ex: LinkedIn, Facebook, Google+,
		name: String,
		// The link of this social profile or the name in the social network.
		// Ex: LinkedIn Url, Twitter handler
		URL: String
	}],
	about: {
		defaultText: { type: String, default: '' },
		text: { type: String, default: '' }
	},
	openForCommunication: { type: Boolean, default: false },
	positionType: {type: String, default: ''},
	solutionAreas: { 
		selectedValues: { type: [String], default: []},
		possibleValues: { type: [String], default: []}
	},
	quickNotes: [{
		timestamp: { type: Number, default: 0},
		text: { type: String, default: ''},
		author: { type: String, default: ''}
	}],
    source: {
        name: {type: String, default: ''},
        metadata: {
            resourceId: String,
            resourceURL: String
        }
    },
	lastInteractionTimestamp: { type: Number, default: 0},
	isSandbox: {type: Boolean, default: false},
	externalId :{ type: String, default: ''}
});
mongoose.model('contact',contactSchema);

exports.Contact = mongoose.model('contact');
