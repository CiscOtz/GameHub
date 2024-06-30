import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";

import DB from "./config/db.js";

import ProductRouter from "./routes/ProductRoutes.js";
import UserRouter from "./routes/UserRoutes.js";
import PedidoRouter from "./routes/PedidoRoutes.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
console.log(port);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", ProductRouter);
app.use("/api", UserRouter);
app.use("/api", PedidoRouter);

app.get("/", (req, res) => {
    res.send("Bienvenido a la página principal");
});

app.get("/about", (req, res) => {
    res.send("Acerca de nosotros");
});

app.get("/catalogo", (req, res) => {
    res.send("Catálogo de productos");
});

app.get("/carrito", (req, res) => {
    res.send("Carrito de compras");
});

app.get("/pago", (req, res) => {
    res.send("Resumen de pago");
});

//Conexion a la base de datos
DB.connectDB(process.env.DB_URI);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});