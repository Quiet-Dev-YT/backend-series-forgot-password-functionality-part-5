const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const SendResetEmail = require("../utils/mailer")
class AuthController {
  async login(req, res) {
    try {
      const { email_address, password } = req.body;

      const user = await User.findOne({ email_address });
      if (!user) {
        return res.status(400).json({ message: "Invalid Login Details" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Login Details" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRY,
      });
      if (!token) {
        return res.status(400).json({ message: "Invalid Token" });
      }

      return res
        .status(200)
        .json({ message: "Logged in successfully", user, access_token: token });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ message: "Internal Server error!", error: e.message });
    }
  }

  async register(req, res) {
    try {
      const { name, email_address, password, confirm_password, role } =
        req.body;
      const user = await User.findOne({ email_address });

      if (user) {
        return res.status(400).json({ message: "Email already registered" });
      }

      if (password !== confirm_password) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const savedUser = await User.create({
        name,
        email_address,
        role,
        password: hashedPassword,
      });
      return res
        .status(201)
        .json({ message: "Registered Successfully", savedUser });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Internal server error!", error: e.message });
    }
  }

  async forgot_password(req, res) {
    try {
      const { email_address } = req.body;
      const user = await User.findOne({ email_address });
      if (!user) {
        return res.status(404).json({ message: "Email doesn't exist" });
      }
      const reset_token = crypto.randomBytes(32).toString("hex");
      const reset_token_expiry = new Date(Date.now() + 15 * 60 * 1000);

      const hashed_token = crypto
        .createHash("sha256")
        .update(reset_token)
        .digest("hex");
      user.reset_token = hashed_token;
      user.reset_token_expiry = reset_token_expiry;
      await user.save();

      const reset_link = `${process.env.CLIENT_URL}/forgot-password?token=${reset_token}`;
      await SendResetEmail(user.email_address, reset_link);
      return res.status(200).json({ message: "Reset Link Sent Successfully" });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Internal Server Error!", error: e.message });
    }
  }

  async reset_password(req, res) {
    try {
      const { token, new_password, confirm_password } = req.body;
      if (!token) {
        return res.status(404).json({ message: "Invalid Token or Expired" });
      }
      if (new_password !== confirm_password) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
      const user = await User.findOne({
        reset_token: hashedToken,
        reset_token_expiry: { $gt: new Date() },
      });
      user.password = await bcrypt.hash(new_password, 10);
      user.reset_token = null;
      user.reset_token_expiry = null;
      await user.save();
      return res.status(200).json({ message: "Password reset successfully" });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Internal server errror", error: e.message });
    }
  }
}

module.exports = new AuthController();
