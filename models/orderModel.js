const mongoose = require("mongoose");

const orderSchema =new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "order name required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    userId: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    orderItems: [{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Pizza'
    }],
    shippingAddress: {
      type: Object,
    },
    orderAmount: {
      type: Number, //*watch later *//
      required: true,
    },
    isDeliverd: {
      type: Boolean,
      default: false,
    },
    transectionId: {
      type: String,
      //   required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
