var fs = require('fs'),
    walkSync = require('fr-fswalker').walkSync;



function processFile(path) {


    var line = "",
        i,
        mdActive = false,
        lines = [],
        mdLines = [],
        htmlLines = [],
        markdown = require( 'markdown').markdown;


//var html = markdown.toHTML(md);

    const
        SEP = '+',
        MD_START_TOKEN = '$%&',
        MD_STOP_TOKEN = '$%/',
        FMD_TOKEN = '$§',
        MACRO_TOKEN = '$=';


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

    function prcCommand(cmd, tagAttributes) {
        const START = '&',
            STOP = '/',
            COMMENT = '!',
            MD = '%',
            CMD = '§',
            OPEN_TAG = 1,
            CLOSE_TAG = 0;

        var mode = cmd[0],
            command = cmd[1],
            comment = '',
            tagOpener = '<',
            tagCloser ='>',
            tags,
            tag,
            htmlTag,
            htmlLine = '',
            i;

        switch (mode) {
            case MD:
                if (command == START) {
                    startMD();
                } else if (command == STOP) {
                    stopMD();
                }
                break;
            case CMD:
                tags = cmd.substring(2);
                if (command == STOP) {
                    tagOpener += '/';
                } else if (command == START) {
                    tagCloser = ' '+tagAttributes + tagCloser;
                }
                for (i = 0; i < tags.length; i += 1) {
                    tag = tags[i];
                    switch(tag) {
                        case 'a':
                            htmlTag = tagOpener + "article"+tagCloser;
                            break;
                        case 's':
                            htmlTag = tagOpener + "section"+tagCloser;
                            break;
                        case 'd':
                            htmlTag = tagOpener + "div"+tagCloser;
                            break;
                        case 'h':
                            htmlTag = tagOpener + "header>";
                            break;
                        default:
                            htmlTag = tag;
                    }
                    //htmlLine += htmlTag;
                    htmlLines.push(htmlTag);
                }
                //htmlLines.push(htmlLine);
                break;
            case COMMENT:
                comment = cmd.substring(1);
                htmlLines.push('<!-- ' + comment + '-->');
                break;
            default:
        }
    }

    function prcFMD(line) {

        const OPEN_TOKEN = '&',
            OPEN_TAG = 1,
            CLOSE_TAG = 0;


        var cmds = [],
            c,
            cmd,
            macro,
            sepIndex = line.indexOf(SEP),
            tagAttributes = '',
            token;

        if (sepIndex > 0) {
            token = line.split(SEP);
            macro = token[0];
            tagAttributes = token[1];
            var a = 1;
        } else {
            macro = line;
        }

        cmds = macro.split('$');

        if (isMDActive()) {
            stopMD();
        }

        for (c = 1; c < cmds.length; c += 1) {
            cmd = cmds[c];
            prcCommand(cmd, tagAttributes);
        }


    }

    function prcMacro(line) {
        var macro,
            sepIndex = line.indexOf(SEP),
            tagAttributes = '',
            token;


        if (sepIndex > 0) {
            token = line.split(SEP);
            macro = token[0];
            tagAttributes = SEP + token[1];
        } else {
            macro = line;
        }
        switch(macro) {
            case '$=START_SECTION_BODY':
                macro = '$§/h$%&$!startSectionBody'+tagAttributes;
                break;
            case '$=START_ARTICLE':
                macro = '$§&ah$%&$!startArticle'+tagAttributes;
                break;
            case '$=FIRST_SECTION':
                macro = '$§/h$§&sh$%&!firstSection'+tagAttributes;
                break;
            case '$=NEXT_SECTION':
                macro = '$§/s$§&sh$%&!nextSection'+tagAttributes;
                break;
            case '$=DIV':
                macro = '$§&d$%&'+tagAttributes;
                break;
            case '$=/DIV':
                macro = '$§/d$%&';
                break;
            case '$=STOP_ARTICLE':
                macro = '$§/sa';//NO COMMENT: doesnt work here!
                break;
        }

        prcFMD(macro);
    }









    lines = fs.readFileSync(path).toString().split("\n");


    for(i = 0; i < lines.length; i += 1) {
        line = lines[i];

        if (startsWith(MD_START_TOKEN, line)) {
            startMD();
        } else if (startsWith(MD_STOP_TOKEN, line)) {
            stopMD();
        } else if (startsWith(FMD_TOKEN, line)) {
            prcFMD(line);
        } else if (startsWith(MACRO_TOKEN, line)) {
            prcMacro(line);
        } else {
            collect(line);
        }

    }

    return htmlLines;

}

function writeHTMLFile(path, htmlLines) {
    var postfixIndex = path.lastIndexOf('.'),
        nakedFileName = path.substring(0, postfixIndex),
        htmlPath = nakedFileName + '.html';

    htmlPath = htmlPath.replace(/\/md\//, '/article/');
    fs.writeFile(htmlPath, htmlLines.join('\n'), 'utf-8');
}

const MD_PATH = '/../md';

var articleFileNames = walkSync(__dirname + MD_PATH),
    path,
    htmlLines;

for (i = 0; i < articleFileNames.length; i += 1) {
    path = articleFileNames[i];
    htmlLines = processFile(path);
    writeHTMLFile(path, htmlLines);
}
console.log('CMD DONE');


