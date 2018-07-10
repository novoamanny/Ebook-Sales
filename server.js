const express = require('express');
const stripe = require('stripe')('pk_test_oun6669wL7oNzl2Glr03jbiw');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();
const port = process.env.port || 5000;


//  Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// static Folder
app.use(express.static(`${__dirname}/public`));

// Index route
app.get('/', function(req, res){
    res.render('index');
});



app.listen(port, function(){
    console.log('Now litsening on port: ' + port);
});