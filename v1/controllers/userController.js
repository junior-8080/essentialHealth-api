const resetPassword = (request, response) => {
  response.json({ message: "do password reset" });
};

const changePassword = (request, response) => {
  response.json({ message: "do password reset" });
};

const deleteAccount = (request, response) => {
  response.json({ message: "do delete user account" });
};

export default { resetPassword, deleteAccount, changePassword };
