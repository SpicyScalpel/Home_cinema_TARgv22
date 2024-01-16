module.exports = (sequelize, Sequelize) => {
    const Theatre = sequelize.define("theaters", {
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
        rating:{
            type: Sequelize.DOUBLE,
            allowNull: false
        }
    })
    return Theatre
}