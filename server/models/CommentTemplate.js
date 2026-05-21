const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const CommentTemplate = sequelize.define(
  "CommentTemplate",
  {

    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    }

  }
);

module.exports = CommentTemplate;