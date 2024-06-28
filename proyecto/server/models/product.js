import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: { type: Number, min: 0},
    category: { type: Array },
    description: { type: String },
    releaseDate: {  type: Date  },
    requirements: { type: String  }
});

const ProductModel = mongoose.model("Producto", ProductSchema);
export default ProductModel;