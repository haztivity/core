/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {ConfigService,IHaztivityCliConfig} from "@haztivity/cli";
export const config:IHaztivityCliConfig = {
    homeDir:".",
    scoTest:/sco*/,
    scoDir:"examples/course",
    dev:{
        server:{
            root:".",
            port:4444,
            hmr:true
        },
        fusebox:{
            cache:true,
            log:true,
            debug:true
        }
    }
};