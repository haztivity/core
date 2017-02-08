/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */

import {ScoFactory,Sco,ISco} from "../../../src/index";
import {HzNavbarComponent} from "../../components/Navbar";
import {page6611} from "./pages/6611/6611";
import {page6612} from "./pages/6612/6612";
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