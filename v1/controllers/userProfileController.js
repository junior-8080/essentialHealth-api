const create = (request, response) => {
  response.json({
    success: true,
    message: "added new product",
    data: request.user,
  });
};
const update = (request, response) => {
  response.json({ message: "updated product" });
};
const readAll = (request, response) => {
  response.json({ message: "fetched all products" });
};
const readOne = (request, response) => {
  response.json({ message: "fetched one product" });
};
const deleteOne = (request, response) => {
  response.json({ message: "fetched one product" });
};

export default { create, update, readAll, readOne, deleteOne };
