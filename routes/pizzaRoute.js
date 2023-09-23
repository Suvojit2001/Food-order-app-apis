const express = require("express");
const router = express.Router();
const Pizza = require("../models/pizzaModel");
const { auth, isAdmin } = require('../middlewares/UserAuth')

//GET ALL PIZZA || @GET REQUEST
router.get("/getAllPizzas",auth, async (req, res) => {
  try {
    const pizzas = await Pizza.find({});
    res.json({
      success: true,
      data: pizzas
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/addpizza", auth, isAdmin, async (req, res) => {

  const { name, varients, prices, category, image, description } = req.body;
  try {
    const newPizza = await Pizza.create({
      name,
      image,
      varients,
      description,
      category,
      prices,
    });
    res.status(201).json({
      success: true,
      data: newPizza
    });
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/getpizzabyid/:id",auth, async (req, res) => {
  const pizzaId = req.params.id;
  try {
    const pizza = await Pizza.findOne({ _id: pizzaId });
    res.status(200).json({
      success: true,
      data: pizza
    });
  } catch (error) {
    res.json({ message: error });
  }
});

router.put("/updatepizza/:id", auth, isAdmin, async (req, res) => {
  try {
    const pizzaId = req.params.id;
    const { name, varients, prices, category, image, description } = req.body;
    const updatedPizza = await Pizza.findOneAndUpdate({ _id: pizzaId }, {
      name,
      image,
      varients,
      description,
      category,
      prices,
    }, { new: true });
    res.status(200).json({
      success: true,
      data: updatedPizza
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.delete("/deletepizza/:id", auth, isAdmin, async (req, res) => {
  const pizzaId = req.params.id;
  try {
    await Pizza.findOneAndDelete({ _id: pizzaId });
    res.status(200).json({
      success:true,
      message:'Pizza deleted successfully'
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

module.exports = router;
