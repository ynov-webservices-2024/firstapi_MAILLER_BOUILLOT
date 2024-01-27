import { DataTypes } from 'sequelize';
import {sequelize} from '../config/db.js';
import {User} from './user.js'
import {Product} from './product.js'

const Order = sequelize.define('orders', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Order.belongsTo(User, { foreignKey: 'user_id'});
Order.belongsTo(Product, { foreignKey: 'product_id'});

export {Order};