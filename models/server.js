const express = require('express');
const cors = require('cors');

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
        } catch(err) {
            console.log(err);
        }
    }

    middlewares = () => {
        this.app.use(cors("*"));
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes = () => {
        this.app.use(this.base, require('../routes/router') );
    }


}
module.exports = {
    Server
}