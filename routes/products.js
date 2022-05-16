const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');

const {agregarProducto,guardar,detalle,buscar, editar,actualizar,eliminar} = require('../controllers/productsController');

/* multer */
const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, 'public/images/products')
    },
    filename: (req, file, callback) =>{
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage
})

/* /products */
router
    .get('/agregarProducto', agregarProducto)
    .post('/agregarProducto',upload.single('image'), guardar)
    .get('/detalles/:id', detalle)
    .get('/buscar', buscar)
    .get('/editar/:id', editar)
    .put('/actualizar/:id',upload.single('image'), actualizar)
    .delete('/eliminar/:id', eliminar)
    

module.exports = router;