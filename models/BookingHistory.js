import mongoose from "mongoose";

const BookingHistorySchema = new mongoose.Schema({
    bookingDate: { type: String },
    theaterName: { type: String },
    moviName: { type: String },
    bookingTime: { type: Object }
});

const KalaiarangamModel = mongoose.model("Kalaiarangam Booking History", BookingHistorySchema, "Kalaiarangam Booking History");
const AjanthaModel = mongoose.model("Ajantha Booking History", BookingHistorySchema, "Ajantha Booking History");
const KavithalayaModel = mongoose.model("Kavithalaya Booking History", BookingHistorySchema, "Kavithalaya Booking History");
const AmuthaModel = mongoose.model("Amutha Booking History", BookingHistorySchema, "Amutha Booking History");
const PonAmuthaModel = mongoose.model("PonAmutha Booking History", BookingHistorySchema, "PonAmutha Booking History");
const SathiyamModel = mongoose.model("Sathiyam Booking History", BookingHistorySchema, "Sathiyam Booking History");
const PVRModel = mongoose.model("PVR Booking History", BookingHistorySchema, "PVR Booking History");
const MaharajaModel = mongoose.model("Maharaja Booking History", BookingHistorySchema, "Maharaja Booking History");
const VettriModel = mongoose.model("Vettri Booking History", BookingHistorySchema, "Vettri Booking History");
const ElloraModel = mongoose.model("Ellora Booking History", BookingHistorySchema, "Ellora Booking History");

export { KalaiarangamModel, AjanthaModel ,KavithalayaModel,AmuthaModel,PonAmuthaModel,SathiyamModel,PVRModel,MaharajaModel,VettriModel,ElloraModel };
