const { models } = require('../db');
const { productos } = models;

module.exports = {
    async listarProductos(req, res) {
  try {
    const { activos, id } = req.query;
    let where = {};

    // Filtrar solo activos
    if (activos === 'true') {
      where.estado = 1;
    }

    // Filtrar por ID si viene en query
    if (id) {
      where.id_producto = id;
    }

    const dataProductos = await productos.findAll({
      where,   
      include: [
        { model: models.linea_productos, as: 'id_linea_linea_producto', attributes: ['linea_productos'] }
      ]
    });

    if (id && dataProductos.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado"
      });
    }

    return res.status(200).json({
      success: true,
      message: id ? "Producto obtenido exitosamente" : "Productos obtenidos exitosamente",
      data: dataProductos
    });
  } catch (error) {
    console.error("Error al obtener productos", error);
    return res.status(500).json({
      success: false,
      message: "Error al obtener productos"
    });
  }
},
    async crearProducto(req,res){
        try{
            const { body, file } = req;
            let imagen_url = null;
            if(file) {
                imagen_url = `/uploads/${file.filename}`
            }
            const nuevoProducto = await productos.create({
                ...body,
                imagen_url,
                estado: 1
            });
            return res.status(201).json({
                success: true,
                message: "Producto creado exitosamente",
                data: nuevoProducto
            });
        }catch(error){
            console.error("Error al crear el producto", error);
            return res.status(500).json({
                success: true,
                message: "Error al crear el producto"
            });
        }
    },
    async actualizarProducto(req,res){
        try{
            const { id_producto } = req.params;
            const { body, file  } = req;

            const productoActualizar = await productos.findOne({ where: { id_producto, estado:1 } });

            if(!productoActualizar){
                return res.status(404).json({
                    success: false,
                    message: "Producto no encontrado"
                });
            }
            let updateData = { ...body };
            if(file) {
                updateData.imagen_url = `/uploads/${file.filename}`
            }
            console.log(updateData);
            await productoActualizar.update(updateData);
            
            return res.status(200).json({
                success: true,
                message: "Producto actualizado exitosamente",
                data: productoActualizar
            });
        }catch(error){
            console.error("Error al actualizar el producto", error);
            return res.status(500).json({
                success: false,
                message: "Error al actualizar el producto"
            });
        }
    },
        async desactivarProducto(req,res){
        try{
            const { id_producto } = req.params;
            const productoDesactivar = await productos.findOne({
                where: { id_producto, estado:1 }
            });
            if(!productoDesactivar){
                return res.status(404).json({
                    success: false,
                    message: "Producto no encontrado"
                });
            }
            await productoDesactivar.update({ estado:0 });
            return res.status(200).json({
                success: true,
                message: "Producto desactivado exitosamente"
            });
        }catch(error){
            console.error("Error al desactivar el producto", error);
            return res.status(500).json({
                success: false,
                message: "Error al desactivar el producto"
            });
        }
    }
}
