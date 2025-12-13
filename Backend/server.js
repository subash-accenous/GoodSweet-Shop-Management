import express from 'express';
import {v4 as uuid} from 'uuid';
import sweetsmodel from './models/sweetsch.js';
import mongoose from 'mongoose';
import mongoStore from 'connect-mongo';
import jwt from "jsonwebtoken";
import User from "./models/Usersch.js";
import bcrypt from "bcrypt";
import { authenticate, isAdmin } from "./middleware/auth.js";
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();
const dburl=process.env.db_Url || 'mongodb://localhost:27017/yelp-camp';
const port=process.env.PORT || 3000;
const app = express();
//connecting  to mongodb database cloud mongoAtlas
mongoose.connect(dburl);
const db=mongoose.connection;
db.on("error",console.error.bind(console,"Connection error:"));
db.once("open",()=>{
    console.log("successfully connected to db");
});
app.listen(port,()=>{
    console.log("listening on port 3000");
});


app.use(express.json());
// app.use(cors({
//   origin: "http://localhost:5173",
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));
app.use(cors());

app.get("/",(req,res)=>{
  res.send("api ready");
});

app.post("/api/auth/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json({ message: "User registered" });
});


app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});




//api endpoint to create a new sweet
app.post("/api/sweets",authenticate, isAdmin,async(req,res)=>{
const nsweet = await sweetsmodel.create(req.body);
await nsweet.save();
return res.status(201).send(nsweet);
});

//api endpoint to get all sweets
app.get("/api/sweets",authenticate,async(req,res)=>{
    const sweets = await sweetsmodel.find();
return res.status(200).send(sweets);
});
 
//api endpoint to search sweets based on category,price,name
app.get("/api/sweets/search",authenticate,async(req,res)=>{
try {
    const { name, category, minPrice, maxPrice } = req.query;

    const filter = {};

    // search by name (partial, case-insensitive)
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    // search by category
    if (category) {
      filter.category = category;
    }

    // search by price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sweets = await sweetsmodel.find(filter);

    return res.status(200).json(sweets);
  } catch (err) {
    return res.status(500).json({ message: "Search failed", error: err.message });
  }
});


//api endpoint to edit a sweet name or price
app.put("/api/sweets/:id",authenticate, isAdmin,async(req,res)=>{
const {id} = req.params;
console.log(id);
let found= await sweetsmodel.findById(id);
if(!found)
{
    return res.send("cannot find sweet with that id");
}
const sweet = await sweetsmodel.findByIdAndUpdate(id,{$set: {name: req.body.name,price: req.body.price}},{ new: true, runValidators: true });
return res.status(201).send(sweet);    
});

//api endpoint to delete a sweet
app.delete("/api/sweets/:id",authenticate, isAdmin,async(req,res)=>{
const {id} = req.params;
let found = await sweetsmodel.findById(id);
if(!found)
{
     return res.send("cannot find sweet with that id");
}
await sweetsmodel.findByIdAndDelete(id);
return res.status(204).send("successfully deleted sweet");    
})

//api endpoint to purchase sweet thus reducing its quantity
app.post("/api/sweets/:id/purchase",authenticate,async(req,res)=>{
    const {quantity} = req.body;
     const sweet = await sweetsmodel.findOneAndUpdate(
    { _id: req.params.id, quantity: { $gte: quantity } },
    { $inc: { quantity: -quantity } },
    { new: true }
  );

  if (!sweet)
    return res.status(400).json({ message: "Insufficient stock" });

  res.json({ message: "Purchased", sweet });
});

//api endpoint to restock a sweet thus increasing its quantity
app.post("/api/sweets/:id/restock", authenticate, isAdmin,async(req,res)=>{
      const { quantity } = req.body;

  const sweet = await sweetsmodel.findByIdAndUpdate(
    req.params.id,
    { $inc: { quantity } },
    { new: true }
  );

  if (!sweet) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Restocked", sweet });
});
