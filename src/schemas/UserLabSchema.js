import mongoose from "mongoose";

const UserLabSchema = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	lab_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Lab"
	},
	lab_result: {
		type: String
	},
	type: {
		type: String,
		enum: ["recommended", "unrecommended"]
	},
	name: {
		type: String
	},
	created_at: {
		type: Date,
		default: Date.now
	}
});

export default UserLabSchema;
