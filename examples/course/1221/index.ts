/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */

import {ScoFactory,Sco,ISco} from "../../../src/index";
import {HzNavbarComponent} from "../../components/Navbar";
import {page as page6611} from "./pages/6611/page";
import {page as page6612} from "./pages/6612/page";
debugger;
let sco:ISco = ScoFactory.createSco({
    name:"1221",
    pages:[
        page6611,
        page6612
    ],
    components:[
        HzNavbarComponent
    ]
});
//pageChangeStart
sco.on();
//pageChangeEnd
sco.on();
//pageComplete
sco.on();
//sco end
sco.on();
//error
sco.on();
sco.run();
