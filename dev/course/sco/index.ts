/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */

import {ScoFactory,Sco,ISco} from "@haztivity/core";
import {HzNavbarComponent} from "../components/Navbar";
import {page as page6611} from "./pages/6611/page";
import {page as page6612} from "./pages/6612/page";
import template from "./sco.html";
let sco:ISco = ScoFactory.createSco({
    name:"sco1221",
    template:template,
    pages:[
        page6611,
        page6612
    ],
    components:[
        HzNavbarComponent
    ]
});