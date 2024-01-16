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
        time: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        genre:{
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return Film
}
