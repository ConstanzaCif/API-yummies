const { models } = require('../db');
const { linea_productos } = models;

module.exports = {
    async listarLineasProducto(req,res){
        try{
            const { activas } = req.query;
            let where = {};
            if(activas === 'true'){
                where.estado = 1;
            }
            const dataLineaProductos = await linea_productos.findAll({ where });
            return res.status(200).json({
                success: true,
                message: "Lineas de productos obtenidas exitosamente",
                data: dataLineaProductos
            });
        }catch(error){
            console.error("Error al obtener las lineas de productos", error);
            return res.status(500).json({
                success: false,
                message:"Error al obtener las lineas de productos"
            });
        }
    },
    async crearLineaProducto(req,res){
        try{
            const nuevaLineaProducto = await linea_productos.create({ ...req.body, estado:1 });
            return res.status(201).json({
                success: true,
                message: "Linea de producto creada exitosamente",
                data: nuevaLineaProducto
            });
        }catch(error){
            console.error("Error al crear la linea de producto", error);
            return res.status(500).json({
                success: false,
                message: "Error al crear la linea de producto"
            });
        }
    },
    async actualizarLineaProducto(req,res){
        try{
            const { id_linea_productos } = req.params;
            const lineaProductoActualizar = await linea_productos.findOne({
                where: { id_linea_productos, estado:1 }
            });
            if(!lineaProductoActualizar){
                return res.status(404).json({
                    success: false,
                    message: "Linea de producto no encontrada"
                });
            }
            await lineaProductoActualizar.update(req.body);
            return res.status(200).json({
                success: true,
                message: "Linea de producto actualizada exitosamente",
                data: lineaProductoActualizar
            });
        }
        catch(error){
            console.error("Error al actualizar la linea de producto");
            return res.status(500).json({
                success: false,
                message: "Error al actualizar la linea de producto"
            })
        }
    },
    async desactivarLineaProducto(req,res){
        try{
            const { id_linea_productos } = req.params;
            const lineaProductoDesactivar = await linea_productos.findOne({
                where: { id_linea_productos, estado:1 }
            });
            if(!lineaProductoDesactivar)
            {
                return res.status(404).json({
                    success: false,
                    message: "Linea de producto no encontrada"
                });
            }
            await lineaProductoDesactivar.update({ estado:0 });
            return res.status(200).json({
                success: true,
                message: "Linea de producto desactivada exitosamente"
            });
        }catch(error){
            console.error("Error al desactivar la linea de producto",error);
            return res.status(500).json({
                success: false,
                message: "Error al desactivar la linea de producto"
            });
        }
    }
}