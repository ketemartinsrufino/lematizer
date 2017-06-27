const path = require('path');

var config    = require(__dirname + '/config.json')['development'];
const models = require(__dirname + '/database.js');

    loadModels();


function loadModels() {
    const Sequelize = require('sequelize');

    const sequelize = new Sequelize(config.database, config.user, config.password, config);
    const m = models(sequelize, Sequelize.DataTypes);
    const Item = m.Item;

    const queryTokensANVWithLimit = (i, limit) => (
        `Select * from token where item_id=${i.id} and (tag like 'A%' or tag like 'N%' or tag like'V')  LIMIT ${limit}`
    );

    const getTokensByItemAndLimit = (i, limit, callback) => {
        m.Token.all({
            attributes: ['id', 'form', 'lemma', 'tag', 'item_id'],
            where: {
                tag: {
                    $or: {
                        $like: 'A%',
                        $like: 'N%',
                        $like: 'V%',
                    },
                    $and: {item_id:i.id }
                }
            },
            limit: limit
        }).then((tokens) => callback(tokens));

        // tokenizador.query(queryTokensANVWithLimit(i, limit), { model: Token })
        //     .then( callback );
    };

    // const getEspeciesqQueComecamCom = (tokens) => {
    //     if(!tokens.length) {
    //         return;
    //     }
    //
    //     tokens.forEach(token => {
    //         if(!token.lemma) {
    //             console.log('token:', token, token.lemma);
    //         }
    //
    //         sequelize.query(`Select * from especie where nameEspecie like '${token.lemma}%'`, { model: Especie }).then(
    //             especies => {
    //                 especies = ( especies.length > 1? especies: [especies]);
    //                 especies.forEach( e => {
    //                     if(token.lemma.length > 1) {
    //                         // tokenizador.query(`insert into EspeciePorToken (tokenid, especieid, texto)
    //                         // values (${token.id}, ${e.idEspecie}, '${token.lemma}')`,
    //                         //     { model: EspeciePorToken },
    //                         //     { raw: true, type: 'INSERT' });
    //
    //                     }
    //                 });
    //             }
    //         );
    //     });
    //
    // };

    // Item.all().error(  (e) => console.log(e) ).success( (e) => console.log(e) );

    Item.all(
        {
            attributes: ['id', 'descricao', 'especie'],
            include: [{
                model: m.Token,
                where: {
                    tag: {
                        $or: {
                            $like: 'A%',
                            $like: 'N%',
                            $like: 'V%',
                        }
                    }
                },
                limit: 1
            }]
        }
        ).then(function(items) {
            items.forEach( i => {
                console.log(i);
            });
        });

}