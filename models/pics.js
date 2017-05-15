"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

	title: String,
	image: String,
	description: String,
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
	likes: { type: Number, default: 0 },
	date: { type: Date, default: Date.now },
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	album: {type: Schema.Types.ObjectId, ref: 'Album'}


});

module.exports = mongoose.model('Picture', userSchema);
