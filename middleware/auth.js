  import jwt from "jsonwebtoken";
  import dotenv from "dotenv";
  dotenv.config();

  export default function Auth(req, res, next) {
      try {
        if (!req.headers.authorization) {
          return res.status(401).json({ error: "No token provided" });
        }
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
          return res.status(401).json({ error: "Token format error" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
      } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Unauthorized" });
      }
    }
    
  export function localVariables(req, res, next) {
    req.app.locals = {
      OTP: null,
      resetSession: false,
    };
    next();
  }
