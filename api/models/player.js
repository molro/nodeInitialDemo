//const Player = Sequelize.define('Player', atributos, options)

module.exports = (sequelize, type) => {
  const atributos = {
    _id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    playerName: type.STRING,
    totalGames: type.INTEGER,
    winGames: type.INTEGER,
    winRate: type.DECIMAL(10,2)
  }
  const options = {
    timestamp: true,
    createadAt: true,
    updatedAt: true
  };
  return sequelize.define('players',atributos,options)
}