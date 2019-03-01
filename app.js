const express = require('express');
const stripe = require('stripe')('sk_test_aQuo491YsYe6Jdgar3YzgZSu');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();

//Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));

// Set Static folder
app.use(express.static(`${__dirname}/public`));

// Index Route
app.get('/', (req, res) => {
    res.render('index');
});


//Charge Route
app.post('/charge', (req, res) => {
    const amount = 2500;
    
    stripe.customer.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
        amount,
        description: 'Minion toys',
        currency: 'gbp',
        customer: customer.id 
    }))
    .then(charge => res.render('success'))
})

const port = process.env.PORT || 5000;

app.listen(port), () => {
    console.log(`Server started on port ${port}`);
};