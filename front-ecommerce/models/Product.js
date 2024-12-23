import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    images: [{
        type: String,
        default: "default.png",
    }],
    category: {type: mongoose.Types.ObjectId, ref: 'Category'},
    properties: {type: Object}
});

export const Product = models.Product || model('Product', ProductSchema);
