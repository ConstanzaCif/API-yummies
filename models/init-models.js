var DataTypes = require("sequelize").DataTypes;
var _detalle_pedidos = require("./detalle_pedidos");
var _linea_productos = require("./linea_productos");
var _pedidos = require("./pedidos");
var _productos = require("./productos");
var _roles = require("./roles");
var _tiendas = require("./tiendas");
var _usuarios = require("./usuarios");

function initModels(sequelize) {
  var detalle_pedidos = _detalle_pedidos(sequelize, DataTypes);
  var linea_productos = _linea_productos(sequelize, DataTypes);
  var pedidos = _pedidos(sequelize, DataTypes);
  var productos = _productos(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var tiendas = _tiendas(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);

  productos.belongsTo(linea_productos, { as: "id_linea_linea_producto", foreignKey: "id_linea"});
  linea_productos.hasMany(productos, { as: "productos", foreignKey: "id_linea"});
  detalle_pedidos.belongsTo(pedidos, { as: "id_pedido_pedido", foreignKey: "id_pedido"});
  pedidos.hasMany(detalle_pedidos, { as: "detalle_pedidos", foreignKey: "id_pedido"});
  detalle_pedidos.belongsTo(productos, { as: "id_producto_producto", foreignKey: "id_producto"});
  productos.hasMany(detalle_pedidos, { as: "detalle_pedidos", foreignKey: "id_producto"});
  usuarios.belongsTo(roles, { as: "id_rol_role", foreignKey: "id_rol"});
  roles.hasMany(usuarios, { as: "usuarios", foreignKey: "id_rol"});
  pedidos.belongsTo(tiendas, { as: "id_tienda_tienda", foreignKey: "id_tienda"});
  tiendas.hasMany(pedidos, { as: "pedidos", foreignKey: "id_tienda"});
  pedidos.belongsTo(usuarios, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuarios.hasMany(pedidos, { as: "pedidos", foreignKey: "id_usuario"});

  return {
    detalle_pedidos,
    linea_productos,
    pedidos,
    productos,
    roles,
    tiendas,
    usuarios,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
