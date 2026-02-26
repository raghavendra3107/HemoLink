import mongoose from "mongoose";

const bloodSchema = new mongoose.Schema(
  {
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    bloodLab: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Facility",
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Facility",
    },
  },
  { timestamps: true }
);

const Blood = mongoose.model("Blood", bloodSchema);

export default Blood;
