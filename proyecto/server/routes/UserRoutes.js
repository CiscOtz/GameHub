import express, { request, response } from "express";
import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import {createAcessToken} from "../libs/jwt.js";
import {authRequired} from "../libs/validateToken.js";

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
/*
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
        if(!userFound){
            response.status(400).json({message:"User not found"});
        }else{
            const isMatch = await bcrypt.compare(password, userFound.password);
            if(!isMatch){
                return response.status(400).json({message: "Invalid password"});
            } else {
                const token = await createAcessToken({id:userFound._id});
                response.cookie('token', token);
                response.send(userFound);
            }        
        }

    } catch (error) {
        response.status(500).send(error);
    }
});
*/

router.post("/users/register", async (req, res) => {    
    try { 
        const { name, age, email, phoneNumber, password, payMethods } = req.body;
        
        // Check if user already exists
        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            name,
            age,
            email,
            phoneNumber,
            password: hashedPassword,
            payMethods
        });

        await newUser.save();

        const token = await createAcessToken({ id: newUser._id });
        res.cookie('token', token, { httpOnly: true });

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login
router.post("/users/login", async (req, res) => {    
    const { email, password } = req.body;

    try { 
        const userFound = await UserModel.findOne({ email });
        if (!userFound) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = await createAcessToken({ id: userFound._id });
        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({ message: 'Login successful', user: userFound });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Logout
router.post("/users/logout", (request, response) => {
    try{
        response.cookie('token', "", {
            expires: new Date(0),
        });
        return response.sendStatus(200);
    }catch (error) {
        response.status(500).send(error);
    }
});

// Ver perfil
router.get("/users/profile", authRequired, async (request, response) => {
    try {
        const userFound = await UserModel.findOne({_id: request.user.id });

        if(!userFound) return response.status(400).json({message: "User not found"});
    
        response.send(userFound);
    } catch (error){
        response.status(500).send(error);
    }
});


router.put("/users/:id", authRequired, async (request, response) => {
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
router.delete("/users/:id", authRequired, async (request, response) => {
    try {
        const deletedUser = await UserModel.deleteOne({ _id: request.params.id });
        if (deletedUser.deletedCount === 1) {
            response.send({ message: "Usuario eliminado exitosamente" });
        } else {
            response.status(404).send({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        response.status(500).send({ error });
    }
});

export default router;