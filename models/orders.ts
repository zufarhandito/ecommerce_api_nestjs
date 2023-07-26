import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { users } from './users';
import { order_details } from './order_details';

export interface ordersAttributes {
  id?: number;
  user_id?: number;
  totalproduct?: number;
  totalprice?: number;
  createdat?: Date;
  updatedat?: Date;
}

@Table({ tableName: 'orders', schema: 'public', timestamps: false })
export class orders
  extends Model<ordersAttributes, ordersAttributes>
  implements ordersAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('orders_id_seq'::regclass)"),
  })
  @Index({ name: 'orders_pkey', using: 'btree', unique: true })
  id?: number;

  @ForeignKey(() => users)
  @Column({ allowNull: true, type: DataType.INTEGER })
  user_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  totalproduct?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  totalprice?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('now()'),
  })
  createdat?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('now()'),
  })
  updatedat?: Date;

  @BelongsTo(() => users)
  user?: users;

  @HasMany(() => order_details, { sourceKey: 'id' })
  order_details?: order_details[];
}
