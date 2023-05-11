import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { orders } from './orders';
import { products } from './products';

export interface order_detailsAttributes {
  id?: number;
  order_id?: number;
  product_id?: number;
  quantity?: number;
  createdat?: Date;
  updatedat?: Date;
}

@Table({ tableName: 'order_details', schema: 'public', timestamps: false })
export class order_details
  extends Model<order_detailsAttributes, order_detailsAttributes>
  implements order_detailsAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('order_details_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'order_details_pkey', using: 'btree', unique: true })
  id?: number;

  @ForeignKey(() => orders)
  @Column({ allowNull: true, type: DataType.INTEGER })
  order_id?: number;

  @ForeignKey(() => products)
  @Column({ allowNull: true, type: DataType.INTEGER })
  product_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  quantity?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE(6),
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  createdat?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE(6),
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  updatedat?: Date;

  @BelongsTo(() => orders)
  order?: orders;

  @BelongsTo(() => products)
  product?: products;
}
