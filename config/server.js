let express = require('express');
let consign = require('consign');
let bodyParser = require('body-parser');
let expressValidator = require('express-validator');

// iniciar o objeto do express
let app = express();

// setar as variáveis 'view engine' e 'views' do express
app.set('view engine', 'ejs');
app.set('views', './app/views');

// configurar o middleware express.static
app.use(express.static('./app/public'))

// configurar o middleware obdy-parser 
app.use(bodyParser.urlencoded({extended: true}));

// configurar o middleware express-validator
app.use(expressValidator());

// efetuar o autoload das rotas, models, controllers para o app
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app)

module.exports = app;

