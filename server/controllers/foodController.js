import foodModel from '../models/foodModel.js'
import fs from 'fs'


// add food item

const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }
    const image_filename = req.file.filename;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error saving food item" });
  }
};


// all food list
const listFood = async (req,res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//get single food
const getSingleFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }
    res.json({ success: true, data: food });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching food item" });
  }
};

//update
const updateFood = async (req, res) => {
  try {
    const { id, name, description, price, category } = req.body;

    const food = await foodModel.findById(id);
    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    
    if (req.file) {
      fs.unlink(`uploads/${food.image}`, () => {});
      food.image = req.file.filename;
    }

    // Update other fields
    food.name = name || food.name;
    food.description = description || food.description;
    food.price = price || food.price;             
    food.category = category || food.category;

    await food.save();
    res.json({ success: true, message: "Food updated successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error updating food item" });
  }
};

// remove food item
const removeFood = async (req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


export {addFood,listFood,removeFood,updateFood,getSingleFood}