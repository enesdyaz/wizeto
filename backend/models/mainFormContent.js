module.exports = (sequelize, DataTypes) => {
    const MainFormContent  = sequelize.define('MainFormContent', {   // MainFormContent 모델
        logo: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        subtitle: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        buttonName: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        addOn: {
            type: DataTypes.BOOLEAN(),
            allowNull: true,
        },
        tags: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        textAlign: {
            type: DataTypes.BOOLEAN(30),
            allowNull: true,
        },
        bgArray: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        fontArray: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        buttonArray: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        sliderFont: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        sliderPadding: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        sliderOpacity: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        sliderLineHeight: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
    },
    {   // 한글 설정 부분
        charset: 'utf8mb4', // 한국어 사용가능, 아이콘 사용
        collate: 'utf8mb4_general_ci',  // 한국어 저장
    })


    MainFormContent.associate = (db) => {}
    return MainFormContent;
}