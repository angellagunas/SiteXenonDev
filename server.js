var express      = require('express'),
	swig         = require('swig'),
	http         = require('http'),
	passport     = require('passport'),
	session      = require('express-session'),
	cookieParser = require('cookie-parser');
	bodyParser   = require('body-parser');
var server       = express();//<-------------------------------------creamos el server de express
var server_socket = http.createServer(server).listen(8000);//<-------creamos el server de sockets
var io = require('socket.io').listen(server_socket);//<--------------el servidor de eventos escuchara en el mismo puerto que nuestro server de express

swig.setDefaults({
	cache:false,
	varControls: ['<%=', '%>'] //<-------------------------------------tags que se usarán en el html para usar swig
});

//configuracion de express
server.use(bodyParser.urlencoded({ extended : true }));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(session({ secret            : 'mi clave', 
					 key               : 'sid',
	                 saveUninitialized : true,
	                 resave            : true}));

//configuracion de  passport
server.use( passport.initialize() );
server.use( passport.session() );

passport.serializeUser(function(user,done){
	done(null,user);//req.user
});

passport.deserializeUser(function(user,done){
	done(null,user);//req.user
});

//config swig
server.engine('html',swig.renderFile);//<------------------------------el motor de templates es swig
server.set('view engine','html');
server.set('views',__dirname + '/app/views');//<-----------------------en donde van a estar las vistas o templates

server.set('uploadDir', './public/uploads');//<------------------------carpeta en la que se guardaran las cosas que subamos

server.use(express.static('./public'));//<-----------------------------aqui colocamos los css,js,img y toda la informacion publica.

//controllers
require('./app/controllers/home')(server);//<--------------------------agregamos el 

//connections
require('./app/connections/facebook')(server);
require('./app/connections/twitter')(server);
require('./app/connections/local')(server,io);
//require('./app/connections/mail')(server);