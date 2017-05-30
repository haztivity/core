export function run(program) {
    const {FuseBox, SassPlugin, CSSPlugin, UglifyJSPlugin, TypeScriptHelpers} = require("fuse-box");
    const {PugPlugin} = require("fusebox-pug-plugin");
    const fuseCore = FuseBox.init(
        {
            homeDir: "src",
            output: "dev/$name.js",
            globals: {
                "@haztivity/core": {
                    "haztivity": "haztivity"
                }
            },
            package: {
                name: "@haztivity/core",
                main: "index.ts"
            },
            sourceMaps:true,
            cache: false,
            shim: {
                jquery: {
                    source: "node_modules/jquery/dist/jquery.js",
                    exports: "$"
                }
            }
        }
    );
    fuseCore.bundle("core")
            .instructions(`> index.ts`)
            .watch("src/**");
    fuseCore.run();
    const fuseDev = FuseBox.init(
        {
            homeDir: "dev",
            output: "dev/$name.js",
            cache: false,
            log: true,
            debug: true,
            tsConfig: "dev/course/tsconfig.json",
            sourceMaps:true,
            plugins: [
                [
                    SassPlugin(
                        {
                            outputStyle: 'expanded',
                            importer: true
                        }
                    ), CSSPlugin()
                ],
                CSSPlugin(),
                PugPlugin()
            ],
            shim: {
                jquery: {
                    source: "node_modules/jquery/dist/jquery.js",
                    exports: "$"
                }
            }
        }
    );
    fuseDev.dev(
        {
            root: "dev"
        }
    );
    fuseDev.bundle("sco")
           .instructions(`>course/sco/index.ts`)
           .watch("dev/course/**");
    fuseDev.run();
}