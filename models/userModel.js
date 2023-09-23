const mongoose = require("mongoose");

const userSchema =new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    previousOrder:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Order',
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
