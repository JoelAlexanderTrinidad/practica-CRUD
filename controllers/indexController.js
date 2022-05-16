const productos = require('../data/productos.json');
module.exports = {
    index: function(req, res, next) {
        return res.render('index',{
          productos
        });
      }
}