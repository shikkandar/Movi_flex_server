    import { Router } from "express";
    const router=Router()

    import * as controller from '../controllers/appController.js'
    import Auth, { localVariables } from "../middleware/auth.js";
    import { registerMail } from "../controllers/mailer.js";


    /**Post routes */
    router.route('/register').post(controller.register);
    router.route('/registerMail').post(registerMail);
    router.route(`/authendicate`).post(controller.verifyUser,(req,res)=>res.end())
    router.route('/login').post(controller.verifyUser, controller.login) //login app    
    router.route('/user/booking').post(controller.verifyUser,controller.bookingHistory)

    /**Get routes */

    router.route('/user/:username').get(controller.getuser) //user with username
    router.route('/generateOTP').get(controller.verifyUser,localVariables,controller.generateOTP)//generate random otp
    router.route('/verifyOTP').get(controller.verifyUser,controller.verifyOTP)//verify generated otp
    router.route('/createResetSession').get(controller.createResetSesstion)
    router.route('/protected').get(Auth,controller.verifyToken)
    /**PUT methods */
    router.route('/resetPassword').put(controller.verifyUser,controller.resetPassword)//use to reset password
    router.route('/updateuser').put(Auth, controller.updateUser);

    export default router;