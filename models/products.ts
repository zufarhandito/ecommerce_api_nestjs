import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface productsAttributes {
  id?: number;
  name?: string;
  description?: string;
  category_id?: number;
  price?: string;
  image?: string;
  createdat?: Date;
  updatedat?: Date;
}

@Table({ tableName: 'products', schema: 'public', timestamps: false })
export class products
  extends Model<productsAttributes, productsAttributes>
  implements productsAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('products_id_seq'::regclass)"),
  })
  @Index({ name: 'products_pkey', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  name?: string;

  @Column({ allowNull: true, type: DataType.STRING(200) })
  description?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  category_id?: number;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  price?: string;

  @Column({ allowNull: true, type: DataType.STRING(200) })
  image?: string;

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
}
