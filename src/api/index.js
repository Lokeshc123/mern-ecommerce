const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose
  .connect(
    "mongodb+srv://lokeshchauhan629:lokesh12345@cluster0.92spnls.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )

  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
const User = require("./models/user");
const Order = require("./models/order");

//function to send verfication email to user

const sendVerificationEmail = async (email, token) => {
  // create a node mailer transport

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "decdev797@gmail.com",
      password: "Dev12345",
    },
  });
  // compose the msg

  const mailOptions = {
    from: "billu.com",
    to: email,
    subject: "Verify your email",
    text: `Please click on the link below to verify your email: 
  http://localhost:3000/verify-email/${token}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong");
  }
};
// endpoint to register a user

app.post("/register", async (req, res) => {
  try {
    console.log("Req received");
    const { name, email, password } = req.body;
    //check if already exist

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User already exists");
    }
    // CREATE USER

    const user = new User({
      name,
      email,
      password,
    });
    // generate and store user token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    //save the user to datatbase

    await newUser.save();

    // SEND VERFICATION EMAIL

    sendVerificationEmail(newUser.email, newUser.verificationToken);
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong");
  }
});

/// endpoint to verify user email

app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    // find user with matching token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json("Invalid token");
    }
    // update user isVerified to true and verificationToken to null

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json("Account verified successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong");
  }
});
