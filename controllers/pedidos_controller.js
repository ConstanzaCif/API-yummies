'use strict'
const { models } = require('../db')
const { Op } = require("sequelize");
const { pedidos } = models
const { detalle_pedidos } = models
const { productos } = models 

module.exports = {

    async listAll (req, res) {
        try {
            const usuario = req.body.usuario
            const fecha_inicio = req.body.fecha_inicio;
            const fecha_fin = req.body.fecha_fin;

            let where = {};

            if (usuario) {
                where.id_usuario = usuario;
            }

            if (fecha_inicio && fecha_fin) {
                where.fecha = {
                    [Op.between]: [fecha_inicio, fecha_fin]
                };
            } else if (fecha_inicio) {
                where.fecha = { [Op.gte]: fecha_inicio };
            } else if (fecha_fin) {
                where.fecha = { [Op.lte]: fecha_fin };
            }

            const results = await pedidos.findAll({
                where,
                include: [
                    {
                        model: detalle_pedidos,
                        as: 'detalle_pedido'
                    }
                ]
            });

            res.status(200).json({ pedidos: results });
        }
        catch (error) {
            res.status(500).json({ mensaje: "Error al listar los pedidos", error });
        }
    },

    async create (req, res) {
        const detalles = req.body.detalle;
        const tienda = req.body.tienda;
        const ubicacion = req.body.ubicacion;
        const usuario = req.body.id_usuario;
        const fecha = req.body.fecha;

        let subtotal = 0;
        let total = 0

        try {
            const pedido = await pedidos.create({
                fecha: fecha,
                id_tienda: tienda,
                ubicacion: ubicacion, 
                id_usuario: usuario,
                estado: 1
            })

            for(const detalle of detalles) {
                const _producto = await productos.findOne({
                    where: {
                        id_producto: detalle.id_producto,
                        estado: 1
                    }
                });

                if(!_producto) {
                    throw new Error(`Producto con id ${detalle.id_producto} no encontrado`);
                }

                subtotal = _producto.precio * detalle.cantidad;
                total += subtotal;

                await detalle_pedidos.create({
                    id_pedido :pedido.id_pedido,
                    id_producto: detalle.id_producto,
                    cantidad: detalle.cantidad,
                    precio_unitario: _producto.precio,
                    subtotal: subtotal,
                    estado: 1
                })
            }

            await pedido.update ({
                total
            })

            await pedido.reload();
            res.status(201).json({
                mensaje: "Pedido registrado exitosamente",
                pedido: pedido
            })
        }
        catch(error) {
            res.status(500).json({
                mensaje: "Hubo un error al registrar el pedido", error
            })
        }
    }
}