var restify         = require('restify'),
    ServerPort      = require('fr-infra').ServerConfig.coservice.port,
    fs = require('fs');


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

server.use(restify.CORS( {credentials: true, headers: ['x-framlin-co']}));
server.use(restify.fullResponse());

server.get('/co/:site/article/:path', coArticle);
server.get('/co/:site/audio/:path', coAudio);
server.get('/co/:site/images/:path', coImage);

server.listen(ServerPort, function() {
    console.log('%s listening at %s', server.name, server.url);
});
