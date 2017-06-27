
module.exports = function(sequelize, DataTypes) {
    const Item = sequelize.define('item', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        descricao: DataTypes.STRING,
        especie: DataTypes.STRING,

    });

    const Token = sequelize.define('token', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        form: DataTypes.STRING,
        lemma: DataTypes.STRING,
        tag: DataTypes.STRING,
        periodoPos: DataTypes.STRING,
        position: DataTypes.STRING,
        item_id: DataTypes.INTEGER
    });

    const EspeciePorToken = sequelize.define('EspeciePorToken', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        tokenid: DataTypes.INTEGER,
        especieid: DataTypes.INTEGER,
        texto: DataTypes.STRING,
    });

    const Classe = sequelize.define('classe', {
        idClasse: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nameClasse: DataTypes.STRING,
    });

    const SubClasse = sequelize.define('subClasse', {
        idSubClasse: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        idClasse: DataTypes.INTEGER,
        nameSubClasse: DataTypes.STRING,
    });

    SubClasse.hasOne(Classe);

    const Especie = sequelize.define('especie', {
        idEspecie: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        idSubClasse: DataTypes.INTEGER,
        idClasse: DataTypes.INTEGER,
        idCatmat: DataTypes.INTEGER,
        nameEspecie: DataTypes.STRING,
    });

    Token.hasOne(Item, {foreignKey: 'item_id'});

    Especie.hasOne(SubClasse);
    Especie.hasOne(Classe);

    EspeciePorToken.hasOne(Token);
    EspeciePorToken.hasOne(Especie);

    return {

        Item: Item,
        Token: Token,
        EspeciePorToken: EspeciePorToken,
        Classe: Classe,
        SubClasse: SubClasse,
        Especie: Especie
    }
};