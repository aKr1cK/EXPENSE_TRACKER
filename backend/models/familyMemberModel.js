const mongoose = require("mongoose");

const familyMemberSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50,
        },
        middleName: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50,
        },
        icon: {
            type: String,
            default: "",
            trim: true,
        }

    },
    { timeStamp: true }
);

module.exports = mongoose.model("familyMemberSchema", familyMemberSchema);