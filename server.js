const express = require('express');
const keys = require('./config/keys')
const stripe = require('stripe')(keys.stripeSecretKey);
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();
const port = process.env.PORT || 5000;


//  Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Static Folder
app.use(express.static(`${__dirname}/public`));

// Index route
app.get('/', function(req, res){
    res.render('index', {
        stripePublishableKey: keys.stripePublishableKey
    });
});

// Charge Route
app.post('/charge', function(req,res){
    const amount = 2500;

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
        amount,
        description: 'Web Development Ebook',
        currency: 'usd',
        customer: customer.id
    }))
    .then(charge => res.render('success'));
});


app.listen(port, function(){
    console.log('Now litsening on port: ' + port);
});