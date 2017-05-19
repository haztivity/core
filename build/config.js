// set default source and build directories
const gutil = require("gulp-util");
const program = require('commander');
const path = require("path");
let config = {
    src:path.resolve("src"),
    dist:"dist",
    cache:false,
    production: program.production,
    copy:[]
};
module.exports = config;