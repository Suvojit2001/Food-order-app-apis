const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { auth, isAdmin } = require('../middlewares/UserAuth')

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(200).json({
        success: true,
        message: "Fill all the Entry",
      });
    }
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: "User is already Registered",
      });
    }
    const user = await User.create({ name, email, password });
    res.status(200).json({
      success: true,
      message: "Register success",
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    //data fetch
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please fill All the details carefully '
      })
    }
    // check for registered user
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User is not registered'
      })
    }
    const payload = {
      email: user.email,
      id: user._id,
      isAdmin:user.isAdmin
    }
    //verify and generate jwt token
    if (password=== user.password) {
      //password match
      let token = jwt.sign(payload, process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        });
      user = user.toObject();
      user.token = token;
      user.password = null;
      // cookie(name,data,options)
      const option = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), //default time 20min
        httpOnly: true, //client side e access jate na korte pare
      }
      res.cookie("token", token, option).status(200).json({
        success: true,
        token,
        user,
        message: "user logged in successfully",
      })

    } else {
      //password do not match
      return res.status(403).json({
        success: false,
        message: 'Password incorrect'
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'login failure'
    })
  }
})

router.get("/getallusers", auth, isAdmin, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(404).json({ message: error.stack });
  }
});

router.delete("/deleteuser", auth, isAdmin, async (req, res) => {
  const userid = req.body.userid;
  try {
    await User.findOneAndDelete({ _id: userid });
    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(404).json({ message: error.stack });
  }
});
module.exports = router;
