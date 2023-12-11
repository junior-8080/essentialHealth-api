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
    let newItem = JSON.stringify(item);
    newItem = JSON.parse(newItem);
    newItem.id = newItem._id;
    newItem.instructor_id.id = newItem.instructor_id._id;
    delete newItem._id;
    delete newItem.instructor_id._id;
    newItem.instructor = newItem.instructor_id;
    delete newItem.instructor_id;
    delete newItem._id;
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
