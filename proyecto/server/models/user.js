import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: { 
        type: Number,
        min: 0
    },
    email: { 
        type: String,
        required: true,
        unique: true

    },
    phoneNumber: { type: String },
    password: { 
        type: String,
        unique: true 
    },
    payMethods: { type: String },
    dateRegister: { 
        type: Date, 
        default: Date.now 
    },
    pedidos : {
        type: Schema.Types.ObjectId,
        ref: "Pedido"
    },
});

const UserModel = mongoose.model("Usuario", UserSchema);
export default UserModel;