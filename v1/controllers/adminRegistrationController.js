import Response from "../helpers/ResponseData.js";
import { validateLoginData } from "../utils/validators.js";

const signup = (request, response) => {
  // const data = new Response();
  // data.message = "account created without any issues";
  // const validatedData = validateLoginData(request);

  data.data = request.user;

  response.json(data);
};

export default { signup };
