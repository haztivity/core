const {FuseBox,SassPlugin,CSSPlugin,UglifyJSPlugin,TypeScriptHelpers} = require("fuse-box");
const {PugPlugin} = require("fusebox-pug-plugin");
const fuseCore = FuseBox.init(
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
fuseCore.bundle("index")
        .instructions(`index.ts`)//.instructions(`>index.ts`)
        .watch("src/**");
fuseCore.run();
const fuseDev = FuseBox.init(
    {
        homeDir: ".",
        output:"dev/$name.js",
        cache: false,
        log: true,
        debug: true,
        tsConfig:"dev/course/tsconfig.json",
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
fuseDev.dev(
    {
        root: "."
    }
);
fuseDev.bundle("sco")
       .instructions(`>dev/course/sco/index.ts`)
       .watch("dev&course/**");
fuseDev.run();