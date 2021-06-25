const Sequelize = require('sequelize')
const sequelize = new Sequelize('sequelize-test', 'root', '', {
  dialect: 'mysql',
  host: '127.0.0.1'
})

const Usuario = sequelize.define('Usuario', {
  usuario: Sequelize.STRING,
  senha: Sequelize.STRING
})

const testDB = async () => {
  await sequelize.sync()
  await Usuario.create({
    usuario: 'helder-barbosa',
    senha: '123'
  })
}

testDB()