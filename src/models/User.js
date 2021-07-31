'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          isAlpha: {
            msg: "El nombre solo puede contener letras"
          },
          len: {
            args:[2, 255],
            msg: "El nombre tiene que ser minimamente de dos caracteres"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
        validate: {
        isEmail: {
          msg: "El mail tiene que ser un correo valido"
        }
      }
    },  
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 255],
          msg: "La contraseña tiene que tener minimamente 6 caracteres"          
        }
      }
    },
 }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};