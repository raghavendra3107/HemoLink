import mongoose from "mongoose";

const campRegistrationSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: "Donor", required: true },
  camp: { type: mongoose.Schema.Types.ObjectId, ref: "BloodCamp", required: true },
  timeSlot: { type: String, required: true },
  quantityML: { type: Number, default: 350 },
  donationDate: { type: Date },
  status: { type: String, enum: ["Registered", "Donated", "No-Show"], default: "Registered" },
}, { timestamps: true });

export default mongoose.model("CampRegistration", campRegistrationSchema);
