const Sequelize = require('sequelize')
const sequelize = new Sequelize('sequelize-test', 'root', '', {
  dialect: 'mysql',
  host: '127.0.0.1'
})

const Pessoa = sequelize.define('Pessoa', {
  nome: Sequelize.STRING,
  nascimento: Sequelize.DATE
})

const Usuario = sequelize.define('Usuario', {
  usuario: Sequelize.STRING,
  senha: Sequelize.STRING
})

const Projeto = sequelize.define('Projeto', {
  nome: Sequelize.STRING
})

Pessoa.hasOne(Usuario)
Usuario.belongsTo(Pessoa)
Pessoa.hasMany(Projeto)
Projeto.belongsTo(Pessoa)

const testDB = async () => {
  await sequelize.sync()

  /*
  const pessoa = await Pessoa.create({
    nome: 'Helder Barbosa',
    nascimento: '1990-01-01'
  })

  const user = await Usuario.create({
    usuario: 'helder-barbosa',
    senha: '123'
  })

  user.setPessoa(pessoa)
  
  const usuarios = await Usuario.findAll()
  const pessoas = await Promise.all(usuarios.map(async usuario => {
    return await usuario.getPessoa()
  }))

  console.log(pessoas)
  */
  const usuarios = await Usuario.findAll({
    include: [
      { model: Pessoa }
    ]
  })
  console.log(usuarios)
}

testDB()