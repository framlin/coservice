var restify         = require('restify'),
    ServerPort      = require('fr-infra').ServerConfig.coservice.port,
    fs = require('fs');


// const corsMiddleware = require('restify-cors-middleware');
// const cors = corsMiddleware({
//     origins: ['127.0.0.1:8080', '127.0.0.1:8081','127.0.0.1:8082', '127.0.0.1:8083', '127.0.0.1:8084', '127.0.0.1:8085',
//         '127.0.0.1:8086', '127.0.0.1:8087', '127.0.0.1:8088', '127.0.0.1:8089', '127.0.0.1:8090', '127.0.0.1:8091',
//         '127.0.0.1:8092', '127.0.0.1:8093', '127.0.0.1:8094', '127.0.0.1:8095'],
//     credentials: true,
//     headers: ['x-framlin-co']
// });


function coArticle(req, res, next) {
    fs.createReadStream(__dirname + '/../article/'+req.params.site+'/'+req.params.path+'.html').pipe(res);
}

function coAudio(req, res, next) {
    fs.createReadStream(__dirname + '/../audio/'+req.params.site+'/'+req.params.path+'.ogg').pipe(res);
}

function coImage(req, res, next) {
    fs.createReadStream(__dirname + '/../images/'+req.params.site+'/'+req.params.path+'.png').pipe(res);
}


// ----------- run ----------------------------
var server = restify.createServer();

//---- new cors-restify-middleware usage
// server.pre(cors.preflight);
// server.use(cors.actual);


// server.use(restify.CORS( {credentials: true, headers: ['x-framlin-co']}));
// server.use(restify.fullResponse());

server.get('/co/:site/article/:path', coArticle);
server.get('/co/:site/audio/:path', coAudio);
server.get('/co/:site/images/:path', coImage);

server.listen(ServerPort, function() {
    console.log('%s listening at %s', server.name, server.url);
});
