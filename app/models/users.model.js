module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set(value) {
        throw new Error("Do not try to set the `name` value!");
      },
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 0,
      },
    },
    address: {
      type: Sequelize.JSONB,
      allowNull: true,
    },
    additional_info: {
      type: Sequelize.JSONB,
      allowNull: true,
    },
  });

  return User;
};
