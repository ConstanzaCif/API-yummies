'use strict'
const { models } = require('../db')
const { Op } = require("sequelize");
const { pedidos } = models
const { detalle_pedidos } = models
const { productos } = models 

module.exports = {

    async listAll (req, res) {
        try {

            let usuario, fecha_inicio, fecha_fin
            if(req.body)
            {
                usuario = req.body.usuario || null;
                fecha_inicio = req.body.fecha_inicio || null;
                fecha_fin = req.body.fecha_fin|| null;
            }


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
                        as: 'detalle_pedidos'
                    }
                ]
            });

            res.status(200).json({ pedidos: results });
        }
        catch (error) {
            console.log(error)
            res.status(500).json({ mensaje: "Error al listar los pedidos", error });
        }
    },

    async listOne(req, res) {
        const id_pedido = req.params.id_pedido
        try {
            const pedido = await pedidos.findOne({
                where: {
                    id_pedido
                },
                include: [
                    {
                        model: detalle_pedidos,
                        as: 'detalle_pedidos'
                    }
                ]
            })

            if(!pedido)
            {
                return res.status(404).json({mensaje: "Pedido no encontrado"})
            }

            res.status(200).json({mensaje: "Pedido encontrado", pedido: pedido})
        }
        catch(error) {
            console.log(error)
            return res.status(500).json({mensaje: "Hubo un error" , error})
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
    },
    async cambiarEstado(req, res) {
        const id_pedido = req.params.id_pedido;
        const estado = req.params.estado;

        try
        {
            const pedido = await pedidos.findOne({
                where: {
                    id_pedido,
                    estado: 1
                }
            });

            if(!pedido)
            {
                return res.status(404).json({mensaje: "Pedido no encontrado"})
            }

            await pedido.update({
                estado: estado
            })
            await pedido.reload();

            await detalle_pedidos.update(
                { estado }, 
                { where: { id_pedido: id_pedido } }
            );

            res.status(200).json({mensaje: "Estado de pedido actualizado"})

        }catch(error) {
            console.log(error)
            res.status(500).json({mensaje: "Hubo un error al actualizar el pedido", error})
        }
    }
}