var express = require('express'),
    app = express(),
    port = process.env.PORT || 5005,
    bodyParser = require('body-parser'),
    controller = require('./controller'),
    session = require('express-session'),
    path = require('path');

app.set('view engine', 'ejs');
app.set('public', './public');
//app.set('public', __dirname + '/public');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routeapi');
routes(app);

app.listen(port);
console.log('Listening on port ' + port);