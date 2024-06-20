import mongoose, { Schema } from "mongoose";

const measureSchema = new mongoose.Schema({
	measure: {
		type: Number,
		required: true
	},
	measure_unit: {
		type: String,
		required: true
	}
});

const vitalsSchema = new mongoose.Schema({
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
	}
});
const preferenceSchema = new mongoose.Schema({
	main_goal: String,
	weight_goal: measureSchema,
	training_level: {
		type: String,
		enum: ["Beginner", "Irregular training", "Medium", "Advanced"]
	},
	category_interest: {
		type: [String],
		default: []
	},
	vitals: {
		type: [String],
		default: []
	}
});

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: false
	},
	lastName: {
		type: String,
		required: false
	},
	email: {
		type: String,
		required: false,
		unique: false
	},
	phoneNumber: {
		type: String,
		required: true,
		unique: true
	},
	height: measureSchema,
	weight: measureSchema,
	preference: preferenceSchema,
	profileImage: {
		type: String,
		required: false
	},
	role: {
		type: String,
		required: true,
		default: "User"
	},
	dob: {
		type: Date,
		required: false
	},
	gender: {
		type: String,
		required: false
	},
	points: {
		type: Number,
		default: 0
	},
	state: {
		type: String,
		required: false,
		default: "Active"
	},
	subscription_type: {
		type: Object
	},
	created_at: {
		type: Date,
		default: Date.now()
	}
});

// Pre-hook for hashing password before save
// AdminSchema.pre("save", async function (next) {
//   const hash = await bcrypt.hash(this.password, 10);
//   this.password = hash;
//   next();
// });

// Schema method to check for password match
// AdminSchema.methods.isValidPassword = async function (password) {
//   const compare = await bcrypt.compare(password, this.password);
//   return compare;
// };

export default UserSchema;
