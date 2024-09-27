"use strict";

import { emergeAppmovade } from "./app-movade";
import { emergeAppMetaEnc, emergeAppRelEnc, emergeAppOperativos, AppBackend} from "meta-enc";
import {OperativoGenerator, emergeAppVarCal, emergeAppDatosExt, emergeAppConsistencias, emergeAppProcesamiento, emergeAppDmEncu, pgWhiteList} from 'dmencu';

OperativoGenerator.mainTD = 'personas';
OperativoGenerator.mainTDPK = 'persona'; // TODO: hacer esto dinámico en paquete consistencias
OperativoGenerator.orderedIngresoTDNames = [OperativoGenerator.mainTD, 'personas_calculada'];
OperativoGenerator.orderedReferencialesTDNames = [];

var Appmovade = emergeAppmovade(
    emergeAppDmEncu(
        emergeAppProcesamiento(
            emergeAppConsistencias(
                emergeAppDatosExt(
                    emergeAppMetaEnc(
                        emergeAppRelEnc(
                            emergeAppVarCal(
                                emergeAppOperativos(AppBackend)
                            )
                        )
                    )
                )
            )
        )
    )
);

new Appmovade().start();
