const {FuseBox,SassPlugin,CSSPlugin,UglifyJSPlugin,TypeScriptHelpers} = require("fuse-box");
const {PugPlugin} = require("fusebox-pug-plugin");
const fuseCore = FuseBox.init(
    {
        homeDir: "src",
        output: "dev/$name.js",
        package:{
            name:"@haztivity/core",
            main:"index.ts"
        },
        cache:false
    }
);
fuseCore.bundle("core")
        .instructions(`> index.ts`)
        .watch("src/**");
fuseCore.run();
const fuseDev = FuseBox.init(
    {
        homeDir: "dev",
        output:"dev/$name.js",
        cache: false,
        log: true,
        debug: true,
        tsConfig:"dev/course/tsconfig.json",
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
fuseDev.dev(
    {
        root: "dev"
    }
);
fuseDev.bundle("sco")
       .instructions(`>course/sco/index.ts`)
       .watch("dev/course/**");
fuseDev.run();