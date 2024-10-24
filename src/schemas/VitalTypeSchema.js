import mongoose from "mongoose";


const VariableSchema = new mongoose.Schema({
	title: { type: String, required: true },
	keyword: { type: String, required: true },
	unit: { type: String, required: true },
	data_type: { type: String, enum: ['number', 'string', 'boolean','file'], required: true },
	min: { type: Number, required: false },
	max: { type: Number, required: false }
});


const VitalTypeSchema = new mongoose.Schema({
	title: { type: String, required: true },
	icon: { type: String, required: false },
	variables: [VariableSchema],
	created_by: {
		type: String,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});








export default VitalTypeSchema;
