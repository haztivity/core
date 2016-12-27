'use strict';
const gulp = require('gulp');
const gutil = require("gulp-util");
const path = require("path");
const config = require("./../config");
const scssFiles = path.resolve(config.src,'**/*.scss');
const Server = require("../../server/Server").Server;
gulp.task('server', function () {
    let serverInstance = new Server({
        port:config.server.port
    });
});
