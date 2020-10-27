import { Table, Column, Model, DataType } from "sequelize-typescript"
import { formatDate } from "../../utils/common";

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
    type: DataType.STRING(16),
    comment: "管理员名称",
    allowNull: false
  })
  name: string

  @Column({
    type: DataType.STRING(16),
    comment: "管理员密码",
    allowNull: false
  })
  pwd: string

  @Column({
    type: DataType.INET,
    comment: "父级",
    allowNull: false
  })
  parent: number

  @Column({
    type: DataType.STRING(4096),
    comment: "权限",
    allowNull: false,
    get() {
      return JSON.parse(this.getDataValue("power"))
    },
    set(power) {
      this.setDataValue("power", JSON.stringify(power))
    }
  })
  power: string

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

