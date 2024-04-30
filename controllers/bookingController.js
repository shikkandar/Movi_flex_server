import * as Db_Model from "../models/BookingHistory.js";
import seats from "../helper/seats.js";

const allSeats = seats();

async function bookingTicket(Model, req, res) {
  try {
    const { bookingDate, theaterName, moviName } = req.body;

    if (!bookingDate) {
      return res.status(400).send({ error: "Missing required fields" });
    }
    const booking = await Model.findOne({ bookingDate });
    if (booking) {
      return res.status(200).send({ message: "Booking already exists" });
    }
    const bookingHistory = new Model({
      bookingDate,
      theaterName,
      moviName,
      bookingTime: {
        ["11:00-AM"]: allSeats,
        ["02:15-PM"]: allSeats,
        ["06:15-PM"]: allSeats,
        ["10:00-PM"]: allSeats,
      },
    });
    await bookingHistory.save();
    return res.status(200).send({ message: "Booking successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message || "Server error" });
  }
}

export async function KalaiarangambookingTicket(req, res) {
  return bookingTicket(Db_Model.KalaiarangamModel, req, res);
}
export async function AjanthabookingTicket(req, res) {
  return bookingTicket(Db_Model.AjanthaModel, req, res);
}
export async function AmuthabookingTicket(req, res) {
  return bookingTicket(Db_Model.AmuthaModel, req, res);
}
export async function PonAmuthabookingTicket(req, res) {
  return bookingTicket(Db_Model.PonAmuthaModel, req, res);
}
export async function EllorabookingTicket(req, res) {
  return bookingTicket(Db_Model.ElloraModel, req, res);
}
export async function KavithalayabookingTicket(req, res) {
  return bookingTicket(Db_Model.KavithalayaModel, req, res);
}
export async function MaharajabookingTicket(req, res) {
  return bookingTicket(Db_Model.MaharajaModel, req, res);
}
export async function PVRbookingTicket(req, res) {
  return bookingTicket(Db_Model.PVRModel, req, res);
}
export async function SathiyambookingTicket(req, res) {
  return bookingTicket(Db_Model.SathiyamModel, req, res);
}
export async function VettribookingTicket(req, res) {
  return bookingTicket(Db_Model.VettriModel, req, res);
}

/**Get api Datas */

async function bookingData(Model,req, res) {
  
  const { bookingDate, bookingTime } = req.query;
  
  try {
    if (!bookingDate || !bookingTime) {
      return res.status(400).json({ error: "bookingDate and Time required" });
    }

    const data = await Model.findOne({ bookingDate });
    if (!data) {
      return res.status(404).json({ error: "User not found" });
    }
    const requestedTimeData = data.bookingTime[bookingTime];
    return res
      .status(200)
      .json([
        {
          bookingDate: data.bookingDate,
          moviName: data.moviName,
          theaterName: data.theaterName,
          seats: requestedTimeData,
        },
      ]);
  } catch (error) {
    return res.status(500).json({ error: "An internal server error occurred" });
  }
}
export async function KalaiarangamData(req, res) {
  return bookingData(Db_Model.KalaiarangamModel,req, res);
}
export async function AjanthaData(req, res) {
  return bookingData(Db_Model.AjanthaModel,req, res);
}
export async function AmuthaData(req, res) {
  return bookingData(Db_Model.AmuthaModel,req, res);
}
export async function ElloraData(req, res) {
  return bookingData(Db_Model.ElloraModel,req, res);
}
export async function KavithalayaData(req, res) {
  return bookingData(Db_Model.KavithalayaModel,req, res);
}
export async function MaharajaData(req, res) {
  return bookingData(Db_Model.MaharajaModel,req, res);
}
export async function PVRData(req, res) {
  return bookingData(Db_Model.PVRModel,req, res);
}
export async function PonAmuthaData(req, res) {
  return bookingData(Db_Model.PonAmuthaModel,req, res);
}
export async function SathiyamData(req, res) {
  return bookingData(Db_Model.SathiyamModel,req, res);
}
export async function VettriData(req, res) {
  return bookingData(Db_Model.VettriModel,req, res);
}


/** Put api datas */
async function bookingUpdate(Model, req, res) {
  try {
    const { bookingDate, bookingTime, selectedData } = req.body;

    if (!bookingDate || !bookingTime || !selectedData) {
      return res.status(400).json({ error: "bookingDate, bookingTime, and selectedData are required" });
    }
    
    // Find the document matching the bookingDate
    let data = await Model.findOne({ bookingDate });

    if (!data) {
      return res.status(401).send({ error: "No Record for this date" });
    }

    const updatedSeatsData = { ...data.bookingTime };

    for (const seatKey in selectedData) {
      if (selectedData.hasOwnProperty(seatKey)) {
        const rowKey = seatKey.split('')[0];
        
        if (!updatedSeatsData[bookingTime][rowKey]) {
          return res.status(400).send({ error: `${rowKey} Already Booked` });
        }
        
        updatedSeatsData[bookingTime][rowKey][seatKey] = selectedData[seatKey];
      }
    }

    // Update the document with the updated seats data
    await Model.updateOne({ bookingDate }, { $set: { [`bookingTime.${bookingTime}`]: updatedSeatsData[bookingTime] } });

    // Fetch the updated data
    const requestedTimeData = data.bookingTime[bookingTime];

    return res.status(200).send(requestedTimeData);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}




export async function KalaiarangamUpdate(req, res) {
  return bookingUpdate(Db_Model.KalaiarangamModel, req, res);
}
