const Postagem = require('../models/Postagem');

module.exports = {
    async index(req, res) {
        const postagem = await Postagem.findAll();

        return res.json(postagem);
    }
}