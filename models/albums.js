"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

	title: String,
	images: [{type:Schema.Types.ObjectId, ref: 'Picture'}],
	user: { type: Schema.Types.ObjectId, ref: 'User' },

});

module.exports = mongoose.model('Album', userSchema);