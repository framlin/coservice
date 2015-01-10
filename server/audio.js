var fs = require('fs'),
    walkSync = require('fr-fswalker').walkSync;

const AUDIO_PATH = '/../audio';
const AUDIO_POSTFIX = '.html';

function load(partial) {
    var content = fs.readFileSync(__dirname + AUDIO_PATH + '/' +partial + AUDIO_POSTFIX,{encoding: 'binary'});

    return content;
}



function loadAll() {
    var audioFileNames = walkSync(__dirname + AUDIO_PATH),
        path,
        dirs = [],
        i,
        fileName,
        postfixPos,
        site,
        audio,
        result = {};

    for (i = 0; i < audioFileNames.length; i += 1) {
        path = audioFileNames[i];
        dirs = path.split('/');
        site = dirs[dirs.length - 2];
        fileName = dirs[dirs.length - 1];
        postfixPos = fileName.lastIndexOf('.');
        audio = fileName.substring(0, postfixPos);
        if (!result[site]) {
            result[site] = {};
        }
        result[site][audio] = fs.readFileSync(path, {encoding: 'binary'});

    }
    return result;
}

module.exports = {
    load: load,
    loadAll: loadAll
};