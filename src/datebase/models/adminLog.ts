import { Table, Column, Model, DataType } from "sequelize-typescript"
import { formatDate } from "../../utils/common";
import { APP } from "../../index";

@Table({
  tableName: "adminLog",
  timestamps: false,
  freezeTableName: true
})
export default class TAdminLog extends Model<TAdminLog> {

  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  adminLogId: number

  @Column({
    type: DataType.STRING(20),
    comment: "模块",
    allowNull: false
  })
  module: string

  @Column({
    type: DataType.STRING(20),
    comment: "类型",
    allowNull: false
  })
  type: string

  @Column({
    type: DataType.STRING(16),
    comment: "操作员",
    allowNull: false
  })
  operator: string

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
    get() {
      return formatDate(this.getDataValue("createDate"), "YYYY-mm-dd HH:MM:SS");
    }
  })
  createDate: Date
}

