'use strict'
const { models } = require('../db')
const { pedidos } = models
const { detalle_pedidos } = models

module.exports = {
    async listAll (req, res) {
        try {
            res.status(200).json({pedidos: pedidos.findAll({
                include: [
                    {
                        model: detalle_pedidos,
                        as: 'detalle_pedido'
                    }
                ]
            })})
        }
        catch(error) {
            res.status(500).json({mensaje: "Error al listar los pedidos ", error})
        }
    },

    async create (req, res) {
        const detalles = req.body.detalle;
        const tienda = req.body.tienda;
        const ubicacion = req.body.ubicacion;
        const usuario = req.body.id_usuario;
        const fecha = req.body.fecha;

        let subtotal;
        let total = 0

        try {
            const pedido = await pedidos.create({
                fecha: fecha,
                id_tienda: tienda,
                ubicacion: ubicacion, 
                id_usuario: usuario
            })
        }
        catch(error) {

        }
    }
}