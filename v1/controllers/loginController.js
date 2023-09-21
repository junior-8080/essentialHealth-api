import passport from "passport";
import jwt from "jsonwebtoken";
import { validateLoginData } from "../utils/validators.js";
import Response from "../helpers/ResponseData.js";

const login = (request, response, next) => {
  const data = new Response();

  const validatedData = validateLoginData(request);
  const message = {
    message: "Could not authenticate user",
    error: validatedData.error ?? "Email or password is invalid",
  };

  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        return response.status(400).json(message);
      }

      request.login(user, { session: false }, async (error) => {
        if (error) {
          return response.status(400).json(message);
        }

        const body = {
          id: user._id,
          email: user.email,
          permissions: user.permissions,
        };

        const token = jwt.sign({ user: body }, "TOP_SECRET");

        data.message = "account authentication successful";
        data.data = { token, user: body };

        return response.json(data);
      });
    } catch (error) {
      return response.status(400).json({ message: error });
    }
  })(request, response, next);
};

export default { login };
