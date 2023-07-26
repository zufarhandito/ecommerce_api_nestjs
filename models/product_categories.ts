import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { products } from './products';

export interface product_categoriesAttributes {
  id?: number;
  name?: string;
  description?: string;
  createdat?: Date;
  updatedat?: Date;
}

@Table({ tableName: 'product_categories', schema: 'public', timestamps: false })
export class product_categories
  extends Model<product_categoriesAttributes, product_categoriesAttributes>
  implements product_categoriesAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('product_categories_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'product_categories_pkey', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  name?: string;

  @Column({ allowNull: true, type: DataType.STRING(200) })
  description?: string;

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

  @HasMany(() => products, { sourceKey: 'id' })
  products?: products[];
}
