var program = require('commander');

program
    .command('dev')
    .description('run development scripts')
    .action(function(env, options){
        require("./build/tasks/dev").run(env);
    });
program
    .command('dist')
    .description('run dist scripts')
    .option("-M, --skip-minify", "Skip minify")
    .action(function(env, options){
        debugger;
        require("./build/tasks/dist").run(env);
    });

program.parse(process.argv);