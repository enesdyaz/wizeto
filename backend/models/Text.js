module.exports = (sequelize, DataTypes) => {
    const Text  = sequelize.define('Text', {   // user의 모델
        text: {
            type: DataTypes.STRING(200),
            allowNull: true,
        }
    },
    {   // user의 설정 부분
        charset: 'utf8', // 한국어 사용가능
        collate: 'utf8_general_ci',  // 한국어 저장
    })


    Text.associate = (db) => {

    }
    return Text;
}