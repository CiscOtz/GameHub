import mongoose, { Schema } from "mongoose";

const PedidoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dateOrder: { 
        type: Date,
        default: Date.now 
    },
    address: {  type: String  },
    products: {
        type: Schema.Types.ObjectId,
        ref: "Producto"
    }
});

const PedidoModel = mongoose.model("Pedido", PedidoSchema);
export default PedidoModel;