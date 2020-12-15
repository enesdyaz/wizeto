module.exports = (sequelize, DataTypes) => {
    const Board  = sequelize.define('Board', {   // user의 모델
        title: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        bgColor: {
            type: DataTypes.STRING(100),
            allowNull: true
        }
    },
    {   // user의 설정 부분
        charset: 'utf8', // 한국어 사용가능
        collate: 'utf8_general_ci',  // 한국어 저장
    })


    Board.associate = (db) => {
        db.Board.belongsTo(db.User)

    }
    return Board;
}