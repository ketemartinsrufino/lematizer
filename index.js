
var fs = require('fs');
var http = require('http');
var request = require('sync-request');
const readline = require('readline');


var getLemmatizedTextFromFreeling = function(str, callback) {

    console.log(encodeURI(str.toLowerCase()));

    http.get({
        hostname: 'localhost',
        port: 80,
        path: `/analisador.fl?${encodeURI(str.toLowerCase())}`,
        agent: false  // create a new agent just for this one request
    }, (res) => {
        res.on("data", function(chunk) {
            console.log(chunk);
            callback(chunk);
        });
    });

};


fs.readFile('descricao_comprador.csv',  {encoding: 'utf8'}, function(err, contents) {
  
  contents = contents.toString('utf8').split('\n');

  contents.every(function(item, index){

      if(!item) {
          return true;
      }
      const saveOnFile = (json) => {
          const lematized = JSON.parse(json);
          let str = '';
          for(var i in lematized.tokens) {
              const token = lematized.tokens[i];
              // A: adjetivo, N: substantivo, V: verbo
              if(['A', 'N', 'V' ].indexOf(token.tag.substring(0, 1)) !== -1) {
                  str += token.lemma +' ';
              }

          }
          str += '\n';
          console.log('[ '+ index + ' ] ' + str);
          fs.appendFile('descricao_comprador-lemmatized.csv', str, {flags: 'a'});
      };

      getLemmatizedTextFromFreeling(item, saveOnFile);

      return true;
  });
  console.log('[ FIM ] O/');
});