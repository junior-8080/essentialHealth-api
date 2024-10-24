export const defaultTransformer = (results) => {
	return results.map((item) => {
		let newItem = JSON.stringify(item);
		newItem = JSON.parse(newItem);
		newItem.id = newItem._id;
		delete newItem._id;
		return newItem;
	});
};

export const contentTransformer = (results) => {
	return results.map((item) => {
		const newItem = { ...item }; // Create a shallow copy of the item

		// Handle _id and create id
		newItem.id = newItem._id;
		delete newItem._id;

		// Safely handle nested instructor_id and category_id transformations
		if (newItem.instructor_id) {
			newItem.instructor_id.id = newItem.instructor_id._id;
			delete newItem.instructor_id._id;
			newItem.instructor = newItem.instructor_id;
		} else {
			newItem.instructor = {}; // Add fallback if no instructor_id
		}
		delete newItem.instructor_id;

		if (newItem.category_id) {
			newItem.category_id.id = newItem.category_id._id || "";
			delete newItem.category_id._id;
			newItem.category = newItem.category_id;
		} else {
			newItem.category = {}; // Add fallback if no category_id
		}
		delete newItem.category_id;

		return newItem;
	});
};


export const rewardClaimTransformer = (results) => {
	return results.map((item) => {
		let newItem = JSON.stringify(item);
		newItem = JSON.parse(newItem);
		newItem.id = newItem._id;
		newItem.user_id.id = newItem.user_id._id;
		newItem.reward_id.id = newItem.reward_id._id;
		delete newItem._id;
		delete newItem.user_id._id;
		delete newItem.reward_id._id;
		newItem.user = newItem.user_id;
		newItem.reward = newItem.reward_id;
		delete newItem.user_id;
		delete newItem.reward_id;
		delete newItem._id;
		return newItem;
	});
};

export const shortTransformer = (results) => {
	return results.map((item) => {
		let newItem = JSON.stringify(item);
		newItem = JSON.parse(newItem);
		newItem.id = newItem._id;
		newItem.tag_name = newItem.tag_id?.title;
		delete newItem.tag_id;
		return newItem;
	});
};
