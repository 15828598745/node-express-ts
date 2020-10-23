import { Table, Column, Model, DataType } from "sequelize-typescript"

@Table({
  tableName: "adminUser",
  timestamps: false,
  freezeTableName: true
})
export default class TAdminUser extends Model<TAdminUser> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  adminUserId: number

  @Column({
    type: DataType.CHAR(16),
    comment: "管理员名称",
    allowNull: false
  })
  name: string

  @Column({
    type: DataType.CHAR(16),
    comment: "管理员密码",
    allowNull: false
  })
  pwd: string
}

