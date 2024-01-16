module.exports = (sequelize, Sequelize) => {
    const Film = sequelize.define("films", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        Genre:{
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return Film
}