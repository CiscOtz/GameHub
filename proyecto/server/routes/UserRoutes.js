import express, { response } from "express";
import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import {createAcessToken} from "../libs/jwt.js";

const router = express.Router();

// Muestra todos los usuarios
router.get("/users", async (request, response) => {
    try {
        const users = await UserModel.find({});
        response.send(users);
    } catch (error) {
        response.status(500).send({ error });
    }
});

// Crea un nuevo usuario
router.post("/users/register", async (request, response) => {    
    try { 
        const user = new UserModel(request.body);

        const hashPassword = user.password;
        user.password = await bcrypt.hash(hashPassword, 10);

        await user.save();
        const token = await createAcessToken({id:user._id});
        
        response.cookie('token', token);
        response.send(user);


    } catch (error) {
        response.status(500).send(error);
    }
});

// Login
router.post("/users/login", async (request, response) => {    
    const {email, password} = request.body;

    try { 
        const userFound = await UserModel.findOne({email}); 
        if(!userFound) response.status(400).json({message:"Usuario no encontrado"});

        const isMatch = await bcrypt.compare(password, userFound.password);
        if(!isMatch) return response.status(400).json({message: "Invalid password"});
        
        const token = await createAcessToken({id:userFound._id});
        
        response.cookie('token', token);
        response.send(userFound);


    } catch (error) {
        response.status(500).send(error);
    }
});



// Muestra un determinado usuario
router.get("/users/:id", async (request, response) => {
    try {
        const user = await UserModel.findOne({ _id: request.params.id });
        if (!user) {
            return response.status(404).send({ error: "Usuario no encontrado" });
        }

        response.send(user);

    } catch (error) {
        response.status(500).send({ error });
    }
});

// Actualizar usuario
router.put("/users/:id", async (request, response) => {
    const { id } = request.params;
    const update = request.body;

    try {
        const user = await UserModel.findOneAndUpdate({ _id: id }, update, { new: true });

        if (!user) {
            return response.status(404).send({ error: "Usuario no encontrado" });
        }

        response.send({ message: "Usuario actualizado exitosamente", user });
    } catch (error) {
        response.status(500).send({ error });
    }
});

// Eliminar usuario
router.delete("/users/:id", async (request, response) => {
    try {
        const deletedUser = await UserModel.deleteOne({ _id: request.params.id });
        if (deletedUser) {
            response.send({ message: "Usuario eliminado exitosamente" });
        } else {
            response.status(404).send({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        response.status(500).send({ error });
    }
});

// Iniciar sesión de usuario
router.post("/login", async (request, response) => {
    try {
        response.send("login");
    } catch (error) {
        response.status(500).send( { error });
    }
})

export default router;