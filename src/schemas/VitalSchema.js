import mongoose, { Schema } from "mongoose";

const VitalTargetSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: [
			"steps",
			"blood_pressure",
			"sugar_level",
			"water_level",
			"weight",
			"cholesterol_level",
			"body_temperature",
			"heart_rate",
			"sleep_duration"
		],
		required: true
	},
	unit: {
		type: String,
		enum: ["step", "mmHg", "bpm", "", "cup", "lbs", "hours", "°C", "mg/dL"],
		required: true
	},
	data_type: {
		type: String,
		enum: ["string", "number", "date"],
		required: true
	},
	target: {
		type: Schema.Types.Mixed,
		required: true
	},
	value: {
		type: Schema.Types.Mixed
	},
	user_id: {
		type: mongoose.Schema.Types.ObjectId, // Define as ObjectId type
		ref: "User" // Reference to the Category model
	},
	created_at: {
		type: Date,
		default: Date.now()
	}
});

const VitalTargetSchemaOLD = new mongoose.Schema({
	blood_pressure: {
		dia: {
			progress: { type: Number },
			target: { type: Number },
			unit: { type: String }
		},
		sys: {
			progress: { type: Number },
			target: { type: Number },
			unit: { type: String }
		},
		pulse: {
			progress: { type: Number },
			target: { type: Number },
			unit: { type: String }
		}
	},
	sugar_level: {
		progress: { type: Number },
		target: { type: Number },
		unit: { type: String }
	},
	steps: {
		progress: { type: Number },
		target: { type: Number },
		unit: { type: String }
	},
	water_cups: {
		progress: { type: Number },
		target: { type: Number },
		unit: { type: String }
	},
	user_id: {
		type: mongoose.Schema.Types.ObjectId, // Define as ObjectId type
		ref: "User" // Reference to the Category model
	},
	created_at: {
		type: Date,
		default: Date.now()
	}
});

export default VitalTargetSchema;
