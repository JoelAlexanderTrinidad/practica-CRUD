const productos = require('../data/productos.json');
const fs = require('fs');
const path = require('path');
const req = require('express/lib/request');

module.exports = {
    agregarProducto: (req, res) => {
        return res.render('agregarProducto')
    },
    guardar: (req, res) =>{
        /* return res.send(req.file); */
        const {name, price, description} = req.body;
        
        const nuevoProducto = {
            id: productos[productos.length -1].id + 1,
            name: name.trim(),
            price: +price,
            description: description.trim(),
            image: req.file ? req.file.filename : 'default-image.png'
        }
        productos.push(nuevoProducto);
        fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'productos.json'), JSON.stringify(productos,null,3), 'utf-8');

        return res.redirect('/');
    },
    detalle: (req, res) => {
        
        const producto = productos.find(producto => producto.id === +req.params.id);
        
        return res.render('detalles',{
            producto
        })
    },
    buscar: (req, res) => {
        const {keyword} = req.query;
        const busqueda = productos.filter(producto => producto.name.toLowerCase().includes(keyword.toLowerCase()));
        return res.render('resultado',{
            busqueda,
            keyword
        });
    },
    editar: (req, res) => { 
        const producto = productos.find(product => product.id === +req.params.id);
        return res.render('editar',{
            producto
        })
    },
    actualizar: (req, res) => {
        const {name, price, description} = req.body;

        const productosModificados = productos.map(producto => {
            if(producto.id === +req.params.id){
                const productoModificado = {
                    ...producto,
                    name,
                    price: +price,
                    description: description.trim(),
                    image: req.file ? req.file.filename : producto.image
                }
                if(req.file){
                    if(fs.existsSync(path.resolve(__dirname, '..','public','images','products', producto.image)) && producto.image !== "default-image.png"){
                        fs.unlinkSync(path.resolve(__dirname, '..','public','images','products', producto.image));
                    }
                }
                return productoModificado;
            }
            return producto;
        });
        fs.writeFileSync(path.resolve(__dirname, '../data/productos.json'), JSON.stringify(productosModificados, null, 3),'utf-8');
        return res.redirect('/');
    },
    eliminar: (req, res) => {
        
        const miProducto = productos.find(producto => producto.id === +req.params.id);
       /*  const {image} = miProducto; */
        fs.unlinkSync(path.resolve(__dirname, '..','public','images','products', miProducto.image));

        const productoFiltrado = productos.filter(producto => producto.id !== +req.params.id);
        fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'productos.json'),JSON.stringify(productoFiltrado, null, 3),'utf-8');


        return res.redirect('/')
    }
}