const clean = require("gulp-clean");
const path = require("path");
const {FuseBox,SassPlugin,CSSPlugin,UglifyJSPlugin,TypeScriptHelpers} = require("fuse-box");
const {PugPlugin} = require("fusebox-pug-plugin");
(function() {
    const fuse = FuseBox.init(
        {
            homeDir: "src",
            output: "dev/modules/@haztivity/core/$name.js",
            cache:false,
            package:{
                name:"@haztivity/core",
                main:"index.ts"
            },
        }
    );
    fuse.bundle("index")
        .instructions(`index.ts`)//.instructions(`>index.ts`)
        .watch("src/**");
    fuse.run();
})();
(function() {
    const fuse = FuseBox.init(
        {
            homeDir: ".",
            output:"dev/$name.js",
            cache: false,
            log: true,
            debug: true,
            tsConfig:path.resolve("dev/course/tsconfig.json"),
            modulesFolder:"dev/modules",
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
            ]
        }
    );
    fuse.dev(
        {
            root: path.resolve(".")
        }
    );
    fuse.bundle("sco")
        .instructions(`>course/sco/index.ts`)
        .watch("course/**");
    fuse.run();
})();
