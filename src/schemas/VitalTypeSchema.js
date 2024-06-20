import mongoose from "mongoose";

const VitalTypeSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	unit: {
		type: String
	},
	data_type: {
		type: String
	},
	icon: {
		type: String
	},
	created_by: {
		type: String
	},
	created_at: {
		type: Date,
		default: Date.now
	}
});

export default VitalTypeSchema;
