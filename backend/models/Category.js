module.exports = (sequelize, DataTypes) => {
    const Category  = sequelize.define('Category', {   // user의 모델
        parent: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        child: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
  
    },
    {   // user의 설정 부분
        charset: 'utf8', // 한국어 사용가능
        collate: 'utf8_general_ci',  // 한국어 저장
    })


    Category.associate = (db) => {
        db.Category.hasMany(db.Child)
    }
    return Category;
}