'use strict';

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // isAlpha: {
        //   msg: "El apellido solo puede contener letras"
        // },
        len: {
          args: [2, 255],
          msg: "El apellido tiene que ser minimamente de dos caracters"
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // isAlpha: {
        //   msg: "El nombre solo puede contener letras"
        // },
        len: {
          args: [2, 255],
          msg: "El nombre tiene que ser minimamente de dos caracters"
        }
      }
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // isAlpha: {
        //   msg: "El nombre de usuario solo puede contener letras"
        // },
        len: {
          args: [2, 255],
          msg: "El nombre de usuario tiene que ser minimamente de dos caracters"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "El email tiene que ser un correo valido"
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 255],
          msg: "La contraseña tiene que tener minimamente 6 caracteres"
        }
      }
    },
    password2:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 255],
          msg: "debe tener minimamente 8 caracteres"
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        // isAlpha: {
        //   msg: "El city solo puede contener letras"
        // },
        len: {
          args: [2, 255],
          msg: "El city tiene que ser minimamente de dos caracters"
        }
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        // isAlpha: {
        //   msg: "El country solo puede contener letras"
        // },
        len: {
          args: [2, 255],
          msg: "El country tiene que ser minimamente de dos caracters"
        }
      }
    },
  }, {
    tableName: "users"
  });

  User.associate = function(models) {
    User.hasMany(models.Post, { as: "posts", foreignKey: "userId" });
    User.belongsToMany(models.Role, { as: "roles", through: "user_role", foreignKey: "user_id" });
  };

  // Comprueba que el usuario es administrador
  User.isAdmin = function(roles) {
    let tmpArray = [];
    roles.forEach(role => tmpArray.push(role.role));

    return tmpArray.includes('admin');
  }

  return User;
};