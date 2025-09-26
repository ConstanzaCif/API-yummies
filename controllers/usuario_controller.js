'use strict'
const { models } = require('../db');
const { usuarios } = models

const { createHash } = require('crypto');
const usuarios = require('../models/usuarios');
const { where } = require('sequelize');

module.exports = {
    async listAll(req, res) {
        try {
            const usuarios = await usuarios.findAll()
            res.status(200).json({usuarios})
        }
        catch(error) {
            res.status(500).json({mensaje: "Hubo un error", error})
        }
    },

    async listOne(req, res) {
        const idUsuario = req.params.idUsuario
        try{
            
            const usuario = await usuarios.findOne({
                where: {
                    id_usuarios: idUsuario
                }
            })

            if(!usuario) {
                return res.status(404).json({mensaje: "No se encontro el usuario"})
            }
        }
        catch(error) {
            res.status(500).json({mensaje: "Ocurrio un error", error})
        }
    },

    async createUsuario(req, res) {
        let usuario = req.body;
        usuario.estado = 1;
        try
        {
            const contrasenia_hash = createHash('sha256').update(usuario.password).digest('hex');
            const nuevoUsuario = await usuarios.create({
                usename: usuario.usename,
                password: contrasenia_hash,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                id_rol: usuario.id_rol,
                estado: 1
            });
            res.status(201).json({
                mensaje: "Usuario creado exitosamente"
            })
        }
        catch(error) {
            console.error("Error al crear el usuario ", error)
            res.status(500).json({
                mensaje: "Hubo un error"
            })
        }
    },

    async login_web(req, res) {
        const username = req.body.username
        const password = req.body.password

        const hash_password = createHash('sha256').update(password).digest('hex');

        try
        {
            const usuario = await usuarios.findOne({
                where:{
                    usename: username,
                    password: hash_password,
                    estado: 1,
                    id_rol: 2
                }
            })

            if(!usuario){
                return res.status(404).json({mensaje: "El usuario no fue encontrado"})
            }

            res.status(200).json({
                mensaje:"Inicio de sesión exitoso",
                usuario
            })
        }
        catch(error){
            res.status(500).json({mensaje: "Hubo un error ", error})
        }
    },

    async login_movil(req, res) {
        const username = req.body.username
        const password = req.body.password

        const hash_password = createHash('sha256').update(password).digest('hex');

        try
        {
            const usuario = await usuarios.findOne({
                where:{
                    usename: username,
                    password: hash_password,
                    estado: 1
                }
            })

            if(!usuario){
                return res.status(404).json({mensaje: "El usuario no fue encontrado"})
            }

            res.status(200).json({
                mensaje:"Inicio de sesión exitoso",
                usuario
            })
        }
        catch(error){
            res.status(500).json({mensaje: "Hubo un error ", error})
        }
    },

    async editarUsuario(req, res) {
        const id_usuario = req.params.id_usuario;
        const password = req.body.password || null;
        const nombre = req.body.nombre || null;
        const apellido = req.body.apellido || null;
        const id_rol = req.body.id_rol || null;

        try {
            const _usuario = await usuarios.findOne({
                where: {
                    id_usuarios: id_usuario
                }
            })

            if(!_usuario) {
                return res.status(404).json({
                    mensaje: "Usuario no encontrado"
                })
            }
            
           let updateData = {};

            if (password) {
                updateData.password = createHash('sha256').update(password).digest('hex');
            }
            if (nombre) {
                updateData.nombre = nombre;
            }
            if (apellido) {
                updateData.apellido = apellido;
            }
            if (id_rol) {
                updateData.id_rol = id_rol;
            }

            await _usuario.update(updateData);

            await _usuario.reload();

            res.status(200).json({
                mensaje: "Usuario actualizado correctamente",
                usuario: _usuario
            });

        }catch(error) {
            console.error(error);
            res.status(500).json({
                mensaje: "Hubo un error al actualizar el usuario",
                error
            });
        }
    }

}