import express from "express";
import PedidoModel from "../models/pedido.js";
import { authRequired } from "../libs/validateToken.js";

const router = express.Router();

// Mostrar todos los pedidos
router.get("/pedidos", async (request, response) => {
    try {
        const pedidos = await PedidoModel.find({});
        response.send(pedidos);
    } catch (error) {
        response.status(500).send({ error });
    }
});

// Crear un nuevo pedido
router.post("/pedidos",authRequired, async (request, response) => {
    const pedido = new PedidoModel(request.body);

    try {
        await pedido.save();

        const usuario = await UserModel.findById(request.user._id);

        if (!usuario) {
            return response.status(404).send({ error: "Usuario no encontrado" });
        }

        // Agregar la ID del pedido al campo de pedidos del usuario
        usuario.pedidos.push(pedido._id);

        // Guardar los cambios en el usuario
        await usuario.save();

        response.send(pedido);

        response.send(pedido);
    } catch (error) {
        response.status(500).send(error);
    }
});

// Mostrar un determinado pedido
router.get("/pedidos/:id", async (request, response) => {
    try {
        const pedido = await PedidoModel.findOne({ _id: request.params.id });
        if(pedido){
            response.send(pedido);
        }
        
        response.status(404).send({ message: "Producto no encontrado" });
    } catch (error) {
        response.status(500).send({ error });
    }
});

// Eliminar un determinado pedido
router.delete("/pedidos/:id", async (request, response) => {
    try {
        const pedidoBorrado = await PedidoModel.deleteOne({ _id: request.params.id });
        if (pedidoBorrado) {
            response.send({ message: "Producto eliminado exitosamente" });
        } else {
            response.status(404).send({ message: "Producto no encontrado" });
        }

        
    } catch (error) {
        response.status(500).send( { error });
    }
})


export default router;