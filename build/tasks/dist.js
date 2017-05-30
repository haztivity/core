function run(program) {
    console.log("Cleaning dist");
    const rm = require("rimraf");
    rm("dist", () => {
        const {FuseBox, UglifyJSPlugin} = require("fuse-box");
        let plugins = [];
        const fuseCore = FuseBox.init(
            {
                homeDir: "src",
                output: "dist/$name.js",
                globals: {
                    "@haztivity/core": {
                        "haztivity": "haztivity"
                    }
                },
                sourceMaps: true,
                package: {
                    name: "@haztivity/core",
                    main: "index.ts"
                },
                cache: false,
                shim: {
                    jquery: {
                        source: "node_modules/jquery/dist/jquery.js",
                        exports: "$"
                    }
                }
            }
        );
        fuseCore.bundle("haztivity-core")
                .instructions(`!> [index.ts]`);
        fuseCore.bundle("haztivity-core-standalone")
                .instructions(`> index.ts`);
        fuseCore.run();
        const fuseCoreMin = FuseBox.init(
            {
                homeDir: "src",
                output: "dist/$name.min.js",
                globals: {
                    "@haztivity/core": {
                        "haztivity": "haztivity"
                    }
                },
                package: {
                    name: "@haztivity/core",
                    main: "index.ts"
                },
                cache: false,
                plugins: plugins,
                shim: {
                    jquery: {
                        source: "node_modules/jquery/dist/jquery.js",
                        exports: "$"
                    }
                }
            }
        );
        fuseCoreMin.bundle("haztivity-core")
                   .instructions(`!> [index.ts]`);
        fuseCoreMin.bundle("haztivity-core-standalone")
                   .instructions(`> index.ts`);
        fuseCoreMin.run();
    });
}
module.exports = {
    run: run
};