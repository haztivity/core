function run(program) {
    console.log("Cleaning dist");
    const rm = require("rimraf");
    rm("dist", () => {
        const {FuseBox, UglifyJSPlugin,QuantumPlugin} = require("fuse-box");
        let plugins = [];
        if(program.skipMinify != true){
            plugins.push(UglifyJSPlugin());
        }else{
            console.log("Skiping minify");
        }
        const fuseCore = FuseBox.init(
            {
                homeDir: "src",
                output: "dist/$name.js",
                package: "@haztivity/core",
                cache: false,
                plugins:plugins
            }
        );
        fuseCore.bundle("haztivity-core")
                .instructions(`!> [index.ts]`);
        //fuseCore.bundle("haztivity-core-standalone")
        //        .instructions(`> index.ts`);
        fuseCore.run();
        const fuseCoreMin = FuseBox.init(
            {
                homeDir: "src",
                output: "dist/$name.min.js",
                package: {
                    name: "@haztivity/core",
                    main: "src/index.ts"
                },
                cache: false,
                plugins: plugins
            }
        );
        fuseCoreMin.bundle("haztivity-core")
                   .instructions(`!> [index.ts]`);
        //fuseCoreMin.bundle("haztivity-core-standalone")
        //           .instructions(`> index.ts`);
        fuseCoreMin.run();
    });
}
module.exports = {
    run: run
};