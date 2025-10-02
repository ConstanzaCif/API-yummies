const { models } = require('../db');
const { tiendas } = models;

module.exports = {
    async listarTiendas(req,res) {
        try{
            const { activas } = req.query;
            let where = {};
            if(activas == 'true'){
                where.estado = 1;
            }
            const dataTiendas = await tiendas.findAll({ where });
            return res.status(200).json({
                success: true,
                message: "Tiendas obtenidas exitosamente",
                data: dataTiendas
            });
        }catch(error){
            console.error("Error al obtener las tiendas", error);
            return res.status(500).json({
                success: false,
                message: "Error al obtener las tiendas",
            });
        }
    },
    async obtenerTienda(req, res) {
  try {
    const { id_tiendas } = req.params;
    const tienda = await tiendas.findByPk(id_tiendas);

    if (!tienda) {
      return res.status(404).json({
        success: false,
        message: "Tienda no encontrada"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tienda encontrada",
      data: tienda
    });
  } catch (error) {
    console.error("Error al obtener la tienda", error);
    return res.status(500).json({
      success: false,
      message: "Error al obtener la tienda",
    });
  }
},
    async crearTienda(req,res) {
        try{
            const nuevaTienda = await tiendas.create({ ...req.body, estado: 1 });
            return res.status(201).json({
                success: true,
                message: "Tiendas creada exitosamente",
                data: nuevaTienda
            });
        }catch(error){
            console.error("Error al crear la tienda",error);
            return res.status(500).json({
                success: false,
                message: "Error al crear la tienda"
            });
        }
    },
    async actualizarTienda(req,res){
        try{
            const { id_tiendas } = req.params;
            const tiendaActualizar = await tiendas.findOne({ where: { id_tiendas, estado:1 } });
            if(!tiendaActualizar)
            {
                return res.status(404).json({
                    success: false,
                    message: "Tienda no encontrada"
                });
            }
            await tiendaActualizar.update(req.body);
            return res.status(200).json({
                success: true,
                message: "Tienda actualizada exitosamente",
                data: tiendaActualizar
            });
        }catch(error){
            console.error("Error al actualizar la tienda", error);
            return res.status(500).json({
                success: false,
                message: "Error al actualizar la tienda"
            });
        }
    },
    async desactivarTienda(req,res){
        try{
            const { id_tiendas } = req.params;
            const tiendaDesactivar = await tiendas.findOne({ where: { id_tiendas, estado: 1 } });
            if(!tiendaDesactivar){
                res.status(404).json({
                    success: false,
                    message: "Tienda no encontrada"
                });
            }
            await tiendaDesactivar.update({ estado:0 });
            res.status(200).json({
                success:true,
                message: "Tienda desactivada exitosamente"
            });
        }catch(error){
            console.error("Error al desactivar la tienda");
            res.status(500).json({
                success: false,
                message: "Error al desactivar la tienda"
            });
        }
    }
}