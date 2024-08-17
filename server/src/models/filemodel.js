import mongoose, { Schema } from "mongoose";

const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },

},
    {
        timestamps: true
    }
);

export const File = mongoose.model('File', FileSchema);

