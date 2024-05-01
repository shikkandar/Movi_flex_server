// adminRouter.js
import AdminAuth from "../middleware/adminAuth.js";
import { Router } from "express";

const adminRouter = Router();

import * as controller from '../controllers/adminControler.js';

//Get request
adminRouter.route('/admin/protected').get(AdminAuth,controller.verifyToken)
adminRouter.route('/admin/allBookingData').get(controller.bookingaAllData)

// Admin login route
adminRouter.route('/admin/login').post(controller.verifyAdmin, controller.adminLogin);
adminRouter.route('/theaters').get(controller.getTheaters)

//Put request

adminRouter.route('/admin/updatemovi').put(AdminAuth,controller.updateMoviList)
export default adminRouter;
