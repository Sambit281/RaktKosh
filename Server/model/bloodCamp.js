const mongoose = require("mongoose");

const bloodCampSchema = new mongoose.Schema(
    {
        organizerName: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        donorsCapacity: {
            type: Number,
            required: true,
        },
        contactPerson: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: String,
            required: true,
        },
        organizerAddhar: {
            type: String,
        },
        organizer: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('BloodCamp', bloodCampSchema);

