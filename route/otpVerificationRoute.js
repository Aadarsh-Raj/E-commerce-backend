const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const router = express.Router();
const nodemailer = require("nodemailer");
const UserModel = require("../model/userSchema");

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  secure:true, // added new
  service: "Outlook", // e.g., 'Gmail', 'Outlook', etc.
  auth: {
    user: process.env.MAILER_EMAILID,
    pass: process.env.MAILER_EMAILPASS,
  },
});

async function sendOTP(email, otp) {
  const mailOptions = {
    from: process.env.MAILER_EMAILID,
    to: email,
    subject: "OTP for Verification",
    text: `Your OTP is ${otp} for AryaStoreOnline`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return false;
  }
}
//  routing for otp password, then go to change the password
router.get("/foremail", async (req, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  try {
    const user = await UserModel.findById(req.user._id);
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    const sent = await sendOTP(user.userId, otp);
    if (sent) {
      return res.json({
        success: true,
        message: "OTP sent successfully.",
        otp: otp,
      });
    } else {
      return res.json({
        success: false,
        message: "Failed to send OTP. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
});

module.exports = router;
