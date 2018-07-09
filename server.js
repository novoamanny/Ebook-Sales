const express = require('express');
const stripe = require('stripe')('pk_test_oun6669wL7oNzl2Glr03jbiw');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();
const port = process.env.port || 5000;


// Body Parser
app.use(bodyParser.json());


app.listen(port, function(){
    console.log('Now litsening on port: ' + port);
});