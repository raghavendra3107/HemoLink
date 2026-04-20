import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({path: './backend/.env'});

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/hemolink";

mongoose.connect(uri).then(async () => {
    try {
        const { default: BloodRequest } = await import('./backend/models/bloodRequestModel.js');
        const hospitalId = new mongoose.Types.ObjectId();
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        const currentMonthRequests = await BloodRequest.aggregate([
          { 
            $match: { 
              hospitalId, 
              createdAt: { $gte: startOfMonth }, 
              status: { $ne: "rejected" } 
            } 
          },
          { $group: { _id: null, totalUnits: { $sum: "$units" } } }
        ]);
        console.log("SUCCESS", currentMonthRequests);
    } catch(e) {
        console.error("ERROR CAUGHT:", e);
    }
    process.exit();
}).catch(console.error);
