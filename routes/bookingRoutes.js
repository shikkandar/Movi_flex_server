import { Router } from "express";

const bookingRouter=Router();

import * as controller from '../controllers/bookingController.js';

/**Get request */
bookingRouter.route('/Kalaiarangam/data').get(controller.KalaiarangamData)
bookingRouter.route('/Ajantha/data').get(controller.AjanthaData)
bookingRouter.route('/Amutha/data').get(controller.AmuthaData)
bookingRouter.route('/Ellora/data').get(controller.ElloraData)
bookingRouter.route('/Kavithalaya/data').get(controller.KavithalayaData)
bookingRouter.route('/Maharaja/data').get(controller.MaharajaData)
bookingRouter.route('/PVR/data').get(controller.PVRData)
bookingRouter.route('/PonAmutha/data').get(controller.PonAmuthaData)
bookingRouter.route('/Sathiyam/data').get(controller.SathiyamData)
bookingRouter.route('/Vettri/data').get(controller.VettriData)

/**POST Request */
bookingRouter.route('/Kalaiarangam/booking_ticket').post(controller.KalaiarangambookingTicket)
bookingRouter.route('/Ajantha/booking_ticket').post(controller.AjanthabookingTicket)
bookingRouter.route('/Amutha/booking_ticket').post(controller.AmuthabookingTicket)
bookingRouter.route('/Ellora/booking_ticket').post(controller.EllorabookingTicket)
bookingRouter.route('/Kavithalaya/booking_ticket').post(controller.KavithalayabookingTicket)
bookingRouter.route('/Maharaja/booking_ticket').post(controller.MaharajabookingTicket)
bookingRouter.route('/PVR/booking_ticket').post(controller.PVRbookingTicket)
bookingRouter.route('/PonAmutha/booking_ticket').post(controller.PonAmuthabookingTicket)
bookingRouter.route('/Sathiyam/booking_ticket').post(controller.SathiyambookingTicket)
bookingRouter.route('/Vettri/booking_ticket').post(controller.VettribookingTicket)

/** PUT requests */
bookingRouter.route('/Kalaiarangam/update').put(controller.KalaiarangamUpdate);
bookingRouter.route('/Ajantha/update').put(controller.AjanthaUpdate);
bookingRouter.route('/Amutha/update').put(controller.AmuthaUpdate);
bookingRouter.route('/Ellora/update').put(controller.ElloraUpdate);
bookingRouter.route('/Kavithalaya/update').put(controller.KavithalayaUpdate);
bookingRouter.route('/Maharaja/update').put(controller.MaharajaUpdate);
bookingRouter.route('/PVR/update').put(controller.PVRUpdate);
bookingRouter.route('/PonAmutha/update').put(controller.PonAmuthaUpdate);
bookingRouter.route('/Sathiyam/update').put(controller.SathiyamUpdate);
bookingRouter.route('/Vettri/update').put(controller.VettriUpdate);
export default bookingRouter;