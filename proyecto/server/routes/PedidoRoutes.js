import express from "express";
import PedidoModel from "../models/pedido.js";
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
router.post("/pedidos", async (request, response) => {
    const pedido = new PedidoModel(request.body);

    try {
        await pedido.save();
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