const { response, request } = require("express");

const productos = [];

const home = (req , res = response) => {
    res.render('home');
}

const getProductos = (req , res = response) => {

    const tempProductoss = productos.filter(prd => prd.delete === false);

    res.json({
        total: tempProductoss.length,
        data: tempProductoss,
    });
}

const addProducto = (req = request, res = response) => {

    const { title, price, thumbnail } = req.body;
    const producto = {
        title,
        price,
        thumbnail,
        id: (productos.length + 1),
        delete: false
    }

    productos.push(producto);

    res.json({
        producto,
    });

}

const getProducto = (req = request, res = response) => {
    const { id } = req.params;
    const producto = productos.filter(prd => prd.id === Number(id) && prd.delete === false);

    if ( producto.length === 0) {
        return res.status(404).json({
            error : `El producto con identificador ${id} no se encuentra.`,
        });
    }

    res.status(200).json({
        producto: producto[0],
    });
}

const updateProducto = (req = request, res = response) => {
    
    const { id } = req.params;
    const { title, price, thumbnail } = req.body;

    const indexProducto = productos.findIndex(prd => prd.id === Number(id));

    if ( indexProducto === -1) {
        return res.status(404).json({
            error : `El producto con identificador ${id} no se encuentra.`,
        });
    }

    productos[indexProducto].title = title;
    productos[indexProducto].price = price;
    productos[indexProducto].thumbnail = thumbnail;

    res.json({
        producto: productos[indexProducto]
    });
}

const deleteProducto = (req = request, res = response) => {
    
    const { id } = req.params;
    const indexProducto = productos.findIndex(prd => prd.id === Number(id));

    if ( indexProducto === -1) {
        return res.status(404).json({
            error : `El producto con identificador ${id} no se encuentra.`,
        });
    }

    productos[indexProducto].delete = true;

    res.json({
        producto: productos[indexProducto]
    });
}   

module.exports = {
    getProductos
    , addProducto
    , getProducto
    , updateProducto
    , deleteProducto
    , home
}