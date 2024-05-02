// adminController.js

import AdminModel from "../models/Admin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Movies from "../models/Movi.model.js";
import * as Db_Model from "../models/BookingHistory.js";
import UserModel from "../models/User.model.js";

dotenv.config();

// Middleware to verify if the provided admin username exists
export async function verifyAdmin(req, res, next) {
  try {
    const { username } = req.method === "GET" ? req.query : req.body;

    const admin = await AdminModel.findOne({ username });

    if (!admin) {
      return res.status(404).send({ error: "Admin not found" });
    }

    // Attach the admin document to the request object for further use
    req.admin = admin;

    next();
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

// Admin login function
export async function adminLogin(req, res) {
  const { username, password } = req.body;

  try {
    const admin = req.admin; // Retrieved from the verifyAdmin middleware

    const passwordCheck = await bcrypt.compare(password, admin.password);

    if (!passwordCheck) {
      return res.status(400).send({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        adminId: admin._id,
        username: admin.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).send({
      msg: "Admin login successful!",
      username: admin.username,
      token: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal server error" });
  }
}

export async function getTheaters(req, res) {
  try {
    const theaters = await Movies.find({}); // Project only the name field and exclude _id
    res.status(200).json(theaters); // Send only the theaters data
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function updateMoviList(req, res) {
  try {
    const { adminId } = req.user;
    const { name } = req.body;
    console.log(name);
    if (!adminId) {
      return res.status(404).send({ error: "Admin not found...!" }); // 404 is more appropriate here for "not found"
    }

    const body = req.body;

    const admin = await AdminModel.findOne({ _id: adminId });
    if (!admin) {
      return res.status(404).send({ error: "No admin found with this ID." });
    }
    if (name === undefined) {
      return res.status(404).send({ error: "name not found" });
    }
    await Movies.updateOne({ name: name }, body);
    return res.status(200).send({ msg: "Record Updated...!" }); // 201 should be used for creation. Use 200 for successful updates
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).send({ error: "Internal Server Error" }); // Use 500 for server errors
  }
}

export async function verifyToken(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { userId } = req.user;
  res.status(200).json({ message: `Verified` });
}
export async function bookingaAllData(req, res) {
  try {
    const data = await Db_Model.KalaiarangamModel.find({});

    const groupedData = {};

    data.forEach((doc) => {
      for (const timeSlot in doc.bookingTime) {
        if (!groupedData[timeSlot]) {
          groupedData[timeSlot] = {};
        }
        for (const series in doc.bookingTime[timeSlot]) {
          if (!groupedData[timeSlot][series]) {
            groupedData[timeSlot][series] = {};
          }
          for (const seat in doc.bookingTime[timeSlot][series]) {
            const occupied = doc.bookingTime[timeSlot][series][seat].occupied;
            if (occupied) {
              if (!groupedData[timeSlot][series][seat]) {
                groupedData[timeSlot][series][seat] = [];
              }
              groupedData[timeSlot][series][seat].push({
                _id: doc._id,
                bookingDate: doc.bookingDate,
                theaterName: doc.theaterName,
                moviName: doc.moviName,
              });
            }
          }
        }
      }
    });

    return res.status(200).send({ data: groupedData });
  } catch (error) {
    return res.status(500).send({ Error: "Internal server error" });
  }
}

export async function verifyTicket(req, res) {
  const { username ,user ,tiketNum } = req.query;
  
  try {
    const admin=await AdminModel.findOne({username})
    if (!admin) {
      return res.status(401).send({ status:"Unauthorized Admin"});
    }
    const data= await UserModel.findOne({username:user})
    const requestedData=data.bookingHistory[tiketNum]
    if (!requestedData) {
      return res.status(401).send({ status:"Unauthorized Ticket"});
    }
    return res.status(200).send({ status:"Tiket verified",data:requestedData});
  } catch (error) {
    return res.status(500).send({ Error: "Internal server error" });
  }
}
