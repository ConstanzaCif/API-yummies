const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pedidos', {
    id_pedido: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    id_tienda: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tiendas',
        key: 'id_tiendas'
      }
    },
    latitud: {
      type: DataTypes.DECIMAL(10,7),
      allowNull: true
    },
    longitud: {
      type: DataTypes.DECIMAL(10,7),
      allowNull: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id_usuarios'
      }
    },
    imagen: {
      type: DataTypes.BLOB('medium'),
      allowNull: true
    },
    estado: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pedidos',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_pedido" },
        ]
      },
      {
        name: "tienda-pedido_idx",
        using: "BTREE",
        fields: [
          { name: "id_tienda" },
        ]
      },
      {
        name: "usuario-pedido_idx",
        using: "BTREE",
        fields: [
          { name: "id_usuario" },
        ]
      },
    ]
  });
};
