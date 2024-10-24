import mongoose, { Schema } from "mongoose";

const VitalSchema = new mongoose.Schema({
	vital_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'VitalType',
		required: true
	},
	user_id: {
		type: mongoose.Schema.Types.ObjectId, // Define as ObjectId type
		ref: "User" // Reference to the Category model
	},
	variables: [{
		keyword: {
			type: String,
			required: true
		},
		value: {
			type: Number,
			required: true
		}
	}],
	created_at: {
		type: Date,
		default: Date.now()
	}
});

export default VitalSchema;
