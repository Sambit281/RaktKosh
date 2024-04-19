const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        mobileNo: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
            enum: ["male", "female", "other"],
        },
        age: {
            type: Number,
            required: true,
        },
        bloodGroup: {
            type: String,
            required: true,
            enum: ["O+", "A+", "B+", "AB+", "O-", "A-", "B-", "AB-"],
        },
        quantity: {
            type: Number,
            required: true,
        },
        reason: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        pincode: {
            type: String,
            required: true,
        },
        reqPersonAddhar: {
            type: String,
        },
        submittedBy: {
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


module.exports = mongoose.model('BloodRequest', bloodRequestSchema);
