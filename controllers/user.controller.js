import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {
    UserModel
} from "../models/user.model.js";



const register = async (req, res) => {
    try {
        const {
            username,
            email,
            userpassword
        } = req.body;

        if (!username || !email || !userpassword) {
            return res.status(400).json({
                ok: false,
                message: "Datos incompletos"
            });
        }

        const user = await UserModel.findOneByEmail(email);
        if (user) {
            return res.status(409).json({
                ok: false,
                message: "Usuario ya existe"
            });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(userpassword, salt);
        const newUser = await UserModel.create({
            email,
            userpassword: hashedPassword,
            username
        });

        const token = jwt.sign({
                email: newUser.email,
                role_id: newUser.role_id,
            },
            process.env.JWT_SECRET, {
                expiresIn: "24h",
            }
        );

        return res.status(201).json({
          ok: true,
          msg: { token, role_id: user.role_id },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        });
    }
};

const login = async (req, res) => {
    try {
        const {
            email,
            userpassword
        } = req.body;

        if (!email || !userpassword) {
            return res.status(400).json({
                ok: false,
                message: "Todos los campos son requeridos, por favor completelos"
            });
        }

        const user = await UserModel.findOneByEmail(email);
        console.log(user);
        if (!user) {
            return res.status(404).json({
                ok: false,
                message: "Usuario no encontrado. Por favor registrese."
            });
        }

        const isMatch = await bcryptjs.compare(userpassword, user.userpassword);

        if (!isMatch) {
            return res.status(401).json({
                ok: false,
                message: "Credenciales inválidas"
            });
        }

        const token = jwt.sign({
                email: user.email,
                role_id: user.role_id
            },
            process.env.JWT_SECRET, {
                expiresIn: "24h"
            }
        );

        return res.status(200).json({
          ok: true,
          msg: {
            token,
            role_id: user.role_id,
          },
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error server"
        });
    }
};

const store = async (req, res) => {
    try {

        const user = await UserModel.findOneByEmail(req.email);
        return res.json({
            ok: true,
            message: user
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: "Error server"
        });
    }
};

const findAllUser = async (req, res) => {
    try {
        const users = await UserModel.findAllUser();
        return res.json({
            ok: true,
            message: users
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error server"
        });
    }
};


export const UserController = {
    register,
    login,
    store,
    findAllUser
};