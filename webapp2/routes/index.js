var express = require('express');
var router = express.Router();
var cors = require('cors');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'WebApp2'});
});

router.post('/ajax/demo', function (req, res) {
    var date = Date.now();
    console.log(date, " server accept: ", req.body.username, req.body.password);
    var data = {
        name: req.body.username,
        id: req.body.password,
        server: "server2"
    };
    res.json(data);
    res.end();
})

router.get('/jsonp/demo', function (req, res) {

    var date = Date.now();
    console.log(date, " server accept: ", req.query.username, req.query.password);
    var data = "{" + "username:'" + req.query.username + "',passsword:'" + req.query.password + "',server:'server2'" + "}";
    var callback = req.query.callback;
    var jsonp = callback + '(' + data + ')';
    console.log('jsonp:' + jsonp);
    res.send(jsonp);
    res.end();
})


router.get('/script/demo', function (req, res) {
    var date = Date.now();
    console.log(date, " server accept: ");

    var jsonpCallback = req.query.jsonp;
    var data = 'var data = { username: $("#username").val(), password: $("#password").val()};';
    var debug = 'console.debug(data);'
    var callback = '$(function(){  $("#submit4").on("click", function () {' + data + 'jsonpCallback(data);' + debug + '})});';

    res.send(callback);
    res.end();
})


router.post('/cors/demo', function (req, res) {

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', false);

        var data = {
            name: req.body.username,
            id: req.body.password
        }
        res.send(data);
        res.end();
    }
)

router.post('/cors/demo', function (req, res) {


    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', false);

    var data = {
        name: req.body.username,
        id: req.body.password
    }
    res.send(data);
    res.end();
})

/*
 var whitelist = ['http://localhost:3001', 'http://localhost:3000'];
 var corsOptions = {
 "origin": function (origin, callback) {
 if (whitelist.indexOf(origin) !== -1) {
 callback(null, true);
 } else {
 callback(new Error('Not allowed by CORS'));
 }
 },
 "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
 "preflightContinue": false,
 "optionsSuccessStatus": 200
 }

 router.post('/cors/demo', cors(corsOptions), function (req, res) {

 var data = {
 name: req.body.username,
 id: req.body.password
 }
 res.send(data);
 res.end();
 })
 */
module.exports = router;
