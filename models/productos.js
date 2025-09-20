const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('productos', {
    id_producto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_producto: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    imagen_url: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    precio: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: false
    },
    gramaje: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: false
    },
    id_linea: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'linea_productos',
        key: 'id_linea_productos'
      }
    },
    estado: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'productos',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_producto" },
        ]
      },
      {
        name: "productos-guia_idx",
        using: "BTREE",
        fields: [
          { name: "id_linea" },
        ]
      },
    ]
  });
};
