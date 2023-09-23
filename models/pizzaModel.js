const mongoose = require("mongoose");

const pizzaSchema =new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    varients:{
      type:String,
      required:true,
      enum:["S", "M", "L"]
    },
    prices:{
      type:Number,
      required:true
    },
    category: {
      type: String,
      required: true,
      enum:['veg','nonveg']
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports  = mongoose.model("Pizza", pizzaSchema);

