var restify         = require('restify'),
    ServerPort      = require('fr-infra').ServerConfig.coservice.port,
    audioCache    = require('./audio').loadAll(),
    articleCache    = require('./article').loadAll();


function serveData(req, res, cache, mimeType, isText) {
    var path = req.params.path,
        site = req.params.site,
        result = cache[path],
        header = {
            'Content-Type': mimeType
        },
        binary;


    if (cache[site][path]) {
        result = cache[site][path];
    } else if (cache.company[path]){
        result = cache.company[path];
    }

    if (isText) {
        header['Content-Length'] =  Buffer.byteLength(result);
    } else {
        binary = 'binary';
    }

    res.writeHead(200, header);
    res.end(result, binary);

}

function coArticle(req, res, next) {
    serveData(req, res, articleCache, 'text/html', true);
}

function coAudio(req, res, next) {
    serveData(req, res, audioCache, 'audio/ogg', false);
}

function coArticleIndex(req, res, next) {
    var site = req.params.site,
        siteCache = articleCache[site],
        companyCache = articleCache.company,
        result = {},
        entry,
        header = {
            'Content-Type': 'application/json'
        };

    for (entry in companyCache) {
        result[entry] = '/co/company/article/'+entry;
    }

    for (entry in siteCache) {
        result[entry] = '/co/'+site+'/article/'+entry;
    }

    result = JSON.stringify(result);
    header['Content-Length'] =  Buffer.byteLength(result);

    res.writeHead(200, header);
    res.end(result);
}


function coAudioIndex(req, res, next) {
    var site = req.params.site,
        siteCache = audioCache[site],
        companyCache = audioCache.company,
        result = {},
        entry,
        header = {
            'Content-Type': 'application/json'
        };

    for (entry in companyCache) {
        result[entry] = '/co/company/audio/'+entry;
    }

    for (entry in siteCache) {
        result[entry] = '/co/'+site+'/audio/'+entry;
    }

    result = JSON.stringify(result);
    header['Content-Length'] =  Buffer.byteLength(result);

    res.writeHead(200, header);
    res.end(result);
}


// ----------- run ----------------------------
var server = restify.createServer();

server.use(restify.CORS( {credentials: true, headers: ['x-framlin-co']}));
server.use(restify.fullResponse());

server.get('/co/:site/index/article', coArticleIndex);
server.get('/co/:site/index/audio', coAudioIndex);
server.get('/co/:site/article/:path', coArticle);
server.get('/co/:site/audio/:path', coAudio);

server.listen(ServerPort, function() {
    console.log('%s listening at %s', server.name, server.url);
});
