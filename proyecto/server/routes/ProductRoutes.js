import express from "express";
import ProductModel from "../models/product.js";
const router = express.Router();

// Muestra todos los productos
router.get("/products", async (request, response) => {
    try {
        const products = await ProductModel.find({});
        response.send(products);
    } catch (error) {
        response.status(500).send({ error });
    }
});

// Crea un nuevo producto
router.post("/products", async (request, response) => {
    const product = new ProductModel(request.body);

    try {
        await product.save();
        response.send(product);
    } catch (error) {
        response.status(500).send(error);
    }
});

// Muestra un determinado producto
router.get("/products/:id", async (request, response) => {
    try {
        const product = await ProductModel.findOne({ _id: request.params.id });
        response.send(product);
    } catch (error) {
        response.status(500).send({ error });
    }
});

// Actualiza un producto existente
router.put("/products/:id", async (request, response) => {
    const { id } = request.params;
    const update = request.body;

    try {
        const product = await ProductModel.findOneAndUpdate({ _id: id }, update, { new: true });

        if (!product) {
            return response.status(404).send({ error: "Producto no encontrado" });
        }

        response.send({ message: "Producto actualizado exitosamente", product });
    } catch (error) {
        response.status(500).send({ error });
    }
});

// Elimina un producto 
router.delete("/products/:id", async (request, response) => {
    try {
        const deletedProduct = await ProductModel.deleteOne({ _id: request.params.id });
        if (deletedProduct) {
            response.send({ message: "Producto eliminado exitosamente" });
        } else {
            response.status(404).send({ message: "Producto no encontrado" });
        }
    } catch (error) {
        response.status(500).send({ error });
    }
});

export default router;