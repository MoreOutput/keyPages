var express = require('express'),
app = express(),
ejs = require('ejs'),
crypto = require('crypto'),
http = require('http').Server(app),
io = require('socket.io')(http),
isValidSocket = function() {
	
},
genNewPage = function(fn) {
	crypto.randomBytes(128, function(ex, buf1) {
		crypto.randomBytes(128, function(ex, buf2) {			
			fn(crypto.createHmac('sha512', buf1.toString('hex')).update(buf2.toString('hex')).digest('hex'));
		});
	});
};

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.set('json spaces', 0);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index.html');
});

app.post('/', function(req, res) {
	if (req.xhr) {
		genNewPage(function(key) {
			res.redirect('/' + key);
		});
	}
});

app.get('/:key', function() {
	isValidSocket(req.params.key, function(valid) {
		if (valid) {
			res.render('dummy.html', {
				key: req.param.key
			});
		} else {
			res.redirect('/');
		}
	});
});

io.on('connect', function() {
	console.log('ws connection');
});

app.listen(8008);