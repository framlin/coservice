var fs = require('fs'),
    walkSync = require('fr-fswalker').walkSync;

const ARTICLE_PATH = '/../article';
const ARTICLE_POSTFIX = '.html';

function load(partial) {
    var content = fs.readFileSync(__dirname + ARTICLE_PATH + '/' +partial + ARTICLE_POSTFIX, {encoding: 'utf-8'});

    return content;
}



function loadAll() {
    var articleFileNames = walkSync(__dirname + ARTICLE_PATH),
        path,
        dirs = [],
        i,
        fileName,
        postfixPos,
        site,
        article,
        result = {};

    for (i = 0; i < articleFileNames.length; i += 1) {
        path = articleFileNames[i];
        dirs = path.split('/');
        site = dirs[dirs.length - 2];
        fileName = dirs[dirs.length - 1];
        postfixPos = fileName.lastIndexOf('.');
        article = fileName.substring(0, postfixPos);
        if (!result[site]) {
            result[site] = {};
        }
        result[site][article] = fs.readFileSync(path, {encoding: 'utf-8'});

    }
    return result;
}

module.exports = {
    load: load,
    loadAll: loadAll
};