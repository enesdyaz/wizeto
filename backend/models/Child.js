module.exports = (sequelize, DataTypes) => {
    const Child  = sequelize.define('Child', {   // user의 모델
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        price:{
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        duration:{
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: true,
        },
        imagePath:{
            type: DataTypes.STRING(200),
            allowNull: true,
        }
    },
    {   // user의 설정 부분
        charset: 'utf8', // 한국어 사용가능
        collate: 'utf8_general_ci',  // 한국어 저장
    })


    Child.associate = (db) => {
        db.Child.belongsTo(db.Category)
    }
    return Child;
}