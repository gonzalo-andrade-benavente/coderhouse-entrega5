const express = require('express');
const { engine } = require('express-handlebars');
const productos = [];

class Server {

    constructor() {
        this.PORT = process.env.PORT || 3000;
        this.app = express();
        this.base = '/api/productos';

        this.middlewares();
        this.routes();
    }

    listen = () => {

        try {
            this.app.listen(this.PORT, () => {
                console.log(`Server listening in port ${this.PORT}`);
            });
        } catch (err) {
            console.log(err);
        }
    }

    middlewares = () => {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.engine('handlebars', engine());
        this.app.set('view engine', 'handlebars');
        this.app.set("views", "./views");
    }

    routes = () => {
        this.app.get('/', (req, res) => {
            res.render('home');
        });

        this.app.get('/productos', (req, res) => {
            res.render('productos', { productos });
        });

        this.app.post('/productos', (req, res) => {
            
            const { titleInput:title, priceInput:price, thumbnailInput:thumbnail } = req.body;
            const producto = {
                title,
                price,
                thumbnail,
                id: (productos.length + 1),
                delete: false
            }

            productos.push(producto);

            res.render('home', { producto });
        });
    }


}
module.exports = {
    Server
}