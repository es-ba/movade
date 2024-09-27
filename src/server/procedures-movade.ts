"use strict";

import { ProcedureDef } from "./types-movade";
import { ProcedureContext, CoreFunctionParameters, UploadedFileInfo, OperativoGenerator } from "procesamiento";
import {getOperativoActual, setGenerarIdEncFun, setMaxAgenerar, setHdrQuery} from "dmencu/dist/server/server/procedures-dmencu";
import {json, jsono} from "pg-promise-strict";
var fs = require('fs-extra');
var path = require('path');

setGenerarIdEncFun((area:number,index:number)=>area.toString() + ((index<9)?'0':'') + (index+1).toString());
setMaxAgenerar(99);
//setMaxEncPorArea(99);

export const ProceduresMovade : ProcedureDef[] = [];

//export {Proceduresmovade};