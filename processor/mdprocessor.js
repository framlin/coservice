var fs = require('fs'),
    line = "",
    i,
    mdActive = false,
    lines = [],
    mdLines = [],
    htmlLines = [],
    markdown = require( 'markdown').markdown;


//var html = markdown.toHTML(md);

const MD_PATH = '/../md/runjs/',
    FILENAME = "espruino.md",
    MD_START_TOKEN = '$%&',
    MD_STOP_TOKEN = '$%/',
    FMD_TOKEN = '$§';

lines = fs.readFileSync(__dirname + MD_PATH + FILENAME).toString().split("\n");

function startsWith(token, line) {
    return line.indexOf(token) == 0;
}

function isMDActive() {
    return mdActive;
}

function startMD(){
    mdLines = [];
    mdActive = true;
}

function processMD(mdLines) {
    var md = mdLines.join('\n'),
        html = markdown.toHTML(md);

    htmlLines = htmlLines.concat(html.split('\n'));
}

function stopMD(){
    processMD(mdLines);
    mdActive = false;
}


function collect(line) {
    if (isMDActive()) {
        mdLines.push(line);
    } else {
        htmlLines.push(line);
    }

}

function prcFMD(line) {
    //htmlLines.push(line);


    //const START_AH_TOKEN = '$§ah',
    //    START_AH_HTML = '<article><header>',
    //    START_SH_TOKEN = '$§sh',
    //    START_SH_HTML = '<section><header>',
    //    STOP_A_TOKEN = '$/a',
    //    STOP_A_HTML = '</article>'

    const OPEN_TOKEN = '&',
        OPEN_TAG = 1,
        CLOSE_TAG = 0;

    var fmdToken = line.substring(0, 2),
        htmlLine = '',
        tagMode = line.substring(2,3) == OPEN_TOKEN ? OPEN_TAG : CLOSE_TAG,
        tags = line.substring(3).split(''),
        tag = '',
        htmlTag = ',',
        i;

    if (tagMode == OPEN_TAG) {
        for (i = 0; i < tags.length; i += 1) {
            tag = tags[i];
            switch(tag) {
                case 'a':
                    htmlTag = "<article>\n";
                    break;
                case 's':
                    htmlTag = "<section>\n";
                    break;
                case 'h':
                    htmlTag = "<header>\n";
                    break;
                default:
                    htmlTag = tag;
            }
            htmlLine += htmlTag;
        }
    } else {
        //CLOSE_TAG
        for (i = 0; i < tags.length; i += 1) {
            tag = tags[i];
            switch(tag) {
                case 'a':
                    htmlTag = "</article>\n";
                    break;
                case 's':
                    htmlTag = "</section>\n";
                    break;
                case 'h':
                    htmlTag = "</header>\n";
                    break;
                default:
                    htmlTag = tag;
            }
            htmlLine += htmlTag;
        }
    }

    htmlLines.push(htmlLine);
}

for(i = 0; i < lines.length; i += 1) {
    line = lines[i];

    if (startsWith(MD_START_TOKEN, line)) {
        startMD();
    } else if (startsWith(MD_STOP_TOKEN, line)) {
        stopMD();
    } else if (startsWith(FMD_TOKEN, line)) {
        prcFMD(line);
    } else {
        collect(line);
    }

}

console.log(htmlLines.join('\n'))

fs.writeFile(__dirname + '/../article/runjs/espruino.html', htmlLines.join('\n'), 'utf-8');