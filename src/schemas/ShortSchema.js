import mongoose from "mongoose";

const ShortSchema = new mongoose.Schema({
	resource: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	category_id: {
		type: mongoose.Schema.Types.ObjectId, // Define as ObjectId type
		ref: "Category" // Reference to the Category model
	},
	tag_id: {
		type: mongoose.Schema.Types.ObjectId, // Define as ObjectId type
		ref: "Tag" // Reference to the Category model
	},
	publish_date: {
		type: Date,
		default: Date.now
	},
	created_by: {
		type: String
	},
	created_at: {
		type: Date,
		default: Date.now
	}
});

export default ShortSchema;
