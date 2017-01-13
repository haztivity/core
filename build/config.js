// set default source and build directories
const gutil = require("gulp-util");
const program = require('commander');

program
    .version('0.0.1')
    .option('-p, --port <n>', 'Port for service',parseInt)
    .option('-l, --disable-live-reload', 'Disable live reload. Default enabled')
    .option('-d, --base-dir <val>', 'Base dir for the server. Default ./')
    .option('-P, --production', 'Dist for poroduction')
    .option('-n, --no-sourcemap', 'Don not generate sourcemaps').parse(process.argv);
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
        files: program.disableLiveReload ? [] : [
            "./src/**/*.{html,htm,css,js}"
        ],
        server: {
            baseDir: program.baseDir || "./"
        },
        open:!program.disableLiveReload
    },
    sourcemap:!(!!program.production || program.noSourcemap)
};

module.exports = config;