var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var mysql = require('mysql');

var connection = mysql.createConnection({
    host    :'localhost',
    port : 3306,
    user : 'root',
    password : '2135648',
    database:'jsdata'
});

connection.connect(function(err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
});

var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/tt', function(req,res){
    var query = connection.query('select * from tt',function(err,rows){
        console.log(rows);
        res.json(rows);
    });
    console.log(query);
});