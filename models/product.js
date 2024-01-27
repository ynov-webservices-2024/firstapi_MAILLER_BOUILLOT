import { DataTypes } from 'sequelize';
import {sequelize} from '../config/db.js';

const Product = sequelize.define('products', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    defaultValue: 0,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: 0,
    allowNull: false,
  },
  ref: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  rate: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export {Product};