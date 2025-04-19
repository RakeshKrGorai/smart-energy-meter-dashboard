
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/database");
const MeterReading = require("./models/MeterReading")

connectDB().then(()=>{
    console.log("Connection Established");
    app.listen(4000, ()=>{
        console.log("Server connected to port 4000");
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
        const newReading = new MeterReading(req.body);
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

app.get("/download/energy-data", async (req, res) => {
    try {
      const fileType = req.query.type || "json"; // default to json
      const data = await MeterReading.find().lean();
  
      if (fileType === "csv") {
        const parser = new Parser();
        const csv = parser.parse(data);
        res.setHeader("Content-Disposition", "attachment; filename=energy_data.csv");
        res.setHeader("Content-Type", "text/csv");
        return res.status(200).send(csv);
      } else {
        res.setHeader("Content-Disposition", "attachment; filename=energy_data.json");
        res.setHeader("Content-Type", "application/json");
        return res.status(200).send(JSON.stringify(data, null, 2));
      }
    } catch (err) {
      console.error("Export error:", err);
      res.status(500).send("Failed to export data");
    }
});

app.get("/active-devices", async (req, res) => {
    // Calculate the timestamp for 10 minutes ago
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000); // Using the current date and subtracting 10 minutes

    try {
        const activeDevices = await MeterReading.aggregate([
            { 
                $match: { 
                    createdAt: { $gte: tenMinutesAgo }  // Match createdAt that is greater than or equal to ten minutes ago
                } 
            },
            { 
                $group: { 
                    _id: "$deviceId"  // Group by deviceId to get unique devices
                } 
            }
        ]);

        // Map to get the deviceIds from the result
        const deviceIds = activeDevices.map(d => d._id);
        res.json(deviceIds); // Return active devices
    } catch (err) {
        console.error("Error fetching active devices:", err.message);
        res.status(500).send("Failed to fetch active devices");
    }
});
