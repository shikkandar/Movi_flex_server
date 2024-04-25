import UserModel from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import otpGenerator from "otp-generator";
import { getCurrentDateTime } from "../helper/dataTime.js";
//verify user
dotenv.config();

export async function verifyUser(req, res, next) {
  try {
    const { username } = req.method === "GET" ? req.query : req.body;

    let exist = await UserModel.findOne({ username });

    if (!exist) return res.status(404).send({ error: "Can't find User" });
    
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authenticate Error" });
  }
}



//user regiter
export async function register(req, res) {
  try {
    const { username, email, password, profile, confirm_pwd } = req.body;

    if (!username || !email || !password || !confirm_pwd) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    if (password !== confirm_pwd) {
      return res
        .status(400)
        .send({ error: "Password and confirm password do not match" });
    }

    const checkExists = async (field, value, message) => {
      const exists = await UserModel.findOne({ [field]: value });
      if (exists) {
        throw new Error(message);
      }
    };

    await Promise.all([
      checkExists("username", username, "Username already exists"),
      checkExists("email", email, "Email already exists"),
    ]);
    const { formattedDate, formattedTime } = getCurrentDateTime();
    
    const hashedPassword = await bcrypt.hash(password, 14);
    const hashedConfrimPwd = await bcrypt.hash(confirm_pwd, 14);

    const user = new UserModel({
      username,
      email,
      password: hashedPassword,
      confirm_pwd: hashedConfrimPwd,
      profile: profile || "",
      createdAt: `Date:${formattedDate}-Time:${formattedTime}`, // Format the creation date
      updatedAt: `Date:${formattedDate}-Time:${formattedTime}`, // Format the update date
    });

    await user.save();
    res.status(201).send({ msg: "User registered successfully" });
  } catch (error) {
    if (error.message === "Username already exists") {
      return res.status(409).send({ error: error.message });
    } else if (error.message === "Email already exists") {
      return res.status(422).send({ error: error.message });
    } else {
      return res.status(500).send({ error: error.message || "Server error" });
    }
  }
}


/**Get user */
export async function getuser(req, res) {
  const { username } = req.params;
  try {
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }
    const user = await UserModel.findOne({ username }).select("-password -loginAt -updatedAt -createdAt");


    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(201).json(user);
  } catch (error) {
    console.error("Database access error:", error);
    return res.status(500).json({ error: "An internal server error occurred" });
  }
}

/**Login user */

export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(400).send({ error: "Invalid password" });
    }

    const { formattedDate, formattedTime } = getCurrentDateTime();
    const previousLoginAt = user.loginAt || [];
    const currentLogindAt = `Date: ${formattedDate} Time: ${formattedTime}`;
    const newLoginAt = [currentLogindAt, ...previousLoginAt];

    await UserModel.updateOne(
      { _id: user._id },
      {
        loginAt: newLoginAt,
      }
    );
    let adminFlag=false
    if (user.admin==="yes") {
      adminFlag=true
    }
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        auth:adminFlag,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return res.status(200).send({
      msg: "Login sucessful!",
      username: user.username,
      token: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "An error occurred during login" });
  }
}

/**Generate OTP */
export async function generateOTP(req, res) {
  req.app.locals.OTP = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(201).send({ code: req.app.locals.OTP });
}

/**Verify OTP */

/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req, res) {
  const { username, code } = req.query; // Ensure this matches the client request
  console.log("Verify OTP - Current OTP:", req.app.locals.OTP);
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null;
    req.app.locals.resetSession = true;
    console.log("OTP verified, session started.");
    return res.status(201).send({ msg: "Verify Successfully!" });
  }
  console.log("Failed to verify OTP.");
  return res.status(400).send({ error: "Invalid OTP" });
}

export async function createResetSesstion(req, res) {
  if (req.app.locals.resetSession) {
    return res.status(201).send({ flag: req.app.locals.resetSession });
  }
  return res.status(440).send({ error: "Session expired...!" });
}

export async function resetPassword(req, res) {
  if (!req.app.locals.resetSession) {
    return res.status(401).send({ error: "Session expired or invalid!" });
  }

  const { username, password, confirm_pwd } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: "Username not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 14);
    const hashedConfrimPwd = await bcrypt.hash(confirm_pwd, 14);

    const { formattedDate, formattedTime } = getCurrentDateTime();

    const previousUpdatedAt = user.updatedAt || [];
    const currentUpdatedAt = `Date: ${formattedDate} Time: ${formattedTime}`;
    const newUpdatedAt = [currentUpdatedAt, ...previousUpdatedAt];

    await UserModel.updateOne(
      { _id: user._id },
      {
        password: hashedPassword,
        confirm_pwd: hashedConfrimPwd,
        updatedAt: newUpdatedAt,
      }
    );
    req.app.locals.resetSession = false;
    return res.status(200).send({ msg: "Password updated successfully!" });
  } catch (error) {
    return res.status(500).send({ error: "Internal server error" });
  }
}

export async function updateUser(req, res) {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res.status(404).send({ error: "User not found...!" }); // 404 is more appropriate here for "not found"
    }

    const body = req.body;

    // Add logic to update the updatedAt field
    const { formattedDate, formattedTime } = getCurrentDateTime();
    const currentUpdatedAt = `Date: ${formattedDate} Time: ${formattedTime}`;

    // Fetch the user document
    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      return res.status(404).send({ error: "No user found with this ID." });
    }

    // Check if updatedAt exists, if not, initialize it as an empty array
    const previousUpdatedAt = user.updatedAt || [];

    // Add the currentUpdatedAt to the beginning of the array
    const newUpdatedAt = [currentUpdatedAt, ...previousUpdatedAt];

    // Update the body with the newUpdatedAt array
    body.updatedAt = newUpdatedAt;

    // Update the user document
    await UserModel.updateOne({ _id: userId }, body);

    return res.status(200).send({ msg: "Record Updated...!" }); // 201 should be used for creation. Use 200 for successful updates
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).send({ error: "Internal Server Error" }); // Use 500 for server errors
  }
}

