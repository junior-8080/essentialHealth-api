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
    // console.log("🚀 ~ file: dataTransformers.js:13 ~ returnresults.map ~ item:", item);
    let newItem = JSON.stringify(item);
    newItem = JSON.parse(newItem);
    newItem.id = newItem._id;
    newItem.category_id.id = newItem.category_id._id;
    newItem.instructor_id.id = newItem.instructor_id._id;
    delete newItem._id;
    delete newItem.category_id._id;
    delete newItem.instructor_id._id;
    newItem.category = newItem.category_id;
    newItem.instructor = newItem.instructor_id;
    delete newItem.category_id;
    delete newItem.instructor_id;

    delete newItem._id;
    return newItem;
  });
};
