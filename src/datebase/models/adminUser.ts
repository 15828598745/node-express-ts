import { Table, Column, Model, DataType } from "sequelize-typescript"

@Table({
  tableName: "adminUser"
})
export class AdminUser extends Model<AdminUser> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number

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