var markdown = require( 'markdown').markdown,
    fs = require('fs');

var md = fs.readFileSync(__dirname + '/../md/runjs/espruino.md', {encoding: 'utf-8'});

var html = markdown.toHTML(md);

console.log(html);