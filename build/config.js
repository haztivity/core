// set default source and build directories
const gutil = require("gulp-util");
const program = require('commander');
let config = {
    src:process.cwd()+"/src",
    dist:process.cwd()+"/dist",
    sass:{
        exclude:["bower_components/**/*.scss"]
    },
    production: program.production,
    bowerAssets:[],
    copy:[],
    server:{
        port:program.port || 8081,
        codeSync: !program.disableLiveReload,
        files: "./src/**/*.{html,htm,css,js}",
        server: {
            baseDir: program.baseDir || "./"
        },
        open:!program.disableLiveReload
    },
    tsSourcemap:!(!!program.production || program.noTsSourcemap),
    tsDeclaration:!!program.tsDeclaration
};
module.exports = config;