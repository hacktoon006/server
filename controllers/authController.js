const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// Register User
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create email verification token
    const verifyToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verifyToken,
      verified: false,
    });

    await newUser.save();

    // Send verification email
    const verifyURL = `${process.env.CLIENT_URL}/verify/${verifyToken}`;
    await sendEmail(
      email,
      "Verify your email",
      `
        <h2>Hello ${name},</h2>
        <p>Thank you for registering. Please verify your email by clicking the link below:</p>
        <a href="${verifyURL}" target="_blank">Verify Email</a>
        <p>This link will expire in 1 hour.</p>
      `
    );

    res.status(200).json({ message: "Registration successful! Please check your email to verify your account." });
  } catch (error) {
    console.error("❌ Register Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Verify Email
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) return res.status(404).json({ message: "User not found." });

    if (user.verified) {
      return res.status(200).json({ message: "Email already verified." });
    }

    user.verified = true;
    user.verifyToken = null;
    await user.save();

    res.status(200).json({ message: "Email verified successfully. You can now log in." });
  } catch (error) {
    console.error("❌ Email Verification Error:", error);
    res.status(400).json({ message: "Invalid or expired token." });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    if (!user.verified) {
      return res.status(403).json({ message: "Please verify your email before logging in." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      message: "Login successful.",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
