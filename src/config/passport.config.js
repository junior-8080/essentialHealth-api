import Admin from "../models/Admin.js";
import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";
import extract from "passport-jwt";
import { DEFAULT_ADMIN_PERMISSIONS } from "./defaults.js";

const localStrategy = local.Strategy;
const JWTstrategy = jwt.Strategy;
const ExtractJWT = extract.ExtractJwt;

const setup = () => {
  // Use passport to handle admin login
  passport.use(
    "login",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          // Find user
          const admin = await Admin.findOne({ email });
          if (!admin) return done(null, false, { message: "Admin not found" });
          // Check password match
          const validate = await admin.isValidPassword(password);
          if (!validate) return done(null, null, { message: "Wrong Password" });
          return done(null, admin, { message: "Logged in Successfully" });
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  // Use passport to handle jwt signing
  passport.use(
    new JWTstrategy(
      {
        secretOrKey: "TOP_SECRET",
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          const admin = await Admin.findOne({ _id: token.admin.id }, [
            "email",
            "permissions",
            "accessibleWorkspaces",
            "accessiblePlatforms",
          ]).exec();
          return done(null, admin);
        } catch (error) {
          done(error);
        }
      }
    )
  );
  // Use passport to handle user registration
  passport.use(
    "signup",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (request, email, password, done) => {
        try {
          const { organizationID, lastName, firstName } = request.body;
          const admin = await Admin.create({
            email,
            password,
            organizationID,
            lastName,
            firstName,
            permissions: DEFAULT_ADMIN_PERMISSIONS,
          });
          return done(null, admin);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

export default { setup };
