export const mysql = {
  host: "192.168.88.246",
  port: 8080,
  database: "testAdmin",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 5000
  },
  username: "root",
  password: "",
  models: ["./models"]
}
