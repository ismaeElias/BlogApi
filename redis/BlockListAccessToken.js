const redis = require('redis');
const BlockList = redis.createClient({prefix : 'BlockList-accessToken: '})
const jwt = require('jsonwebtoken');
const manipulaLista = require('./manipulaLista');
const {createHash} = require('crypto');

const manipulaBlockList = manipulaLista(BlockList);


function geraTokenHash(token){
    return createHash('sha256').update(token).digest('hex');
}

module.exports = {
    adiciona : async token => {
        const tokenHash = geraTokenHash(token);
        const dataExpiracao = jwt.decode(token).exp;    
        await manipulaBlockList.adiciona(tokenHash,'',dataExpiracao);

    },
    contemToken : async token => {
        const tokenHash = geraTokenHash(token);
        return manipulaBlockList.contemChave(tokenHash);
    }
}