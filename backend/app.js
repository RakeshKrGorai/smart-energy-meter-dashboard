
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/database");
const MeterReading = require("./models/MeterReading")

connectDB().then(()=>{
    console.log("Connection Established");
    app.listen(3000, ()=>{
        console.log("Server connected to port 3000");
    })
})
.catch((err)=>{
    console.log("Could not establish connection with database : "+err.message);
})


const app = express();
app.use(express.json());
app.use(cors());

app.post("/meter-data", async(req,res)=>{
    try{
        const {voltage, current} = req.body;
        const newReading = new MeterReading(req.body); // ✅ Use ECGReading Model
        await newReading.save();
        console.log("Data saved:", newReading);
        res.status(201).json(newReading);
    }
    catch(err){
        // console.log("Error saving data to the database! => "+err);
        res.status(500).send("Error saving data : "+err.message);
    }
})

app.get("/meter-data", async (req,res)=>{
    try{
        const readings = await MeterReading.find({}).limit(50);
        console.log("Fetched Meter Data : "+readings);
        res.json(readings)
    }
    catch(err){
        console.log("Error fetching data: " +err.message);
        res.status(500).send("Cannot fetch data : "+err.message);
    }
})
