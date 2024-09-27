"use strict";

import {TableDefinition, TableContext} from "./types-movade";

export function personas(context:TableContext):TableDefinition {
    let permitidoeditar= context.user.rol === 'admin'||context.puede.encuestas.ingresar;
    let def:TableDefinition = {
        name: 'personas',
        elementName: 'persona',
        tableName: 'personas',
        editable: permitidoeditar /*|| context.puede.tablas_directas.editar*/, // TODO: FIX: En el dump-db rompe
        fields: [
            { name: "operativo"     , label:'operativo'                  , typeName: "text"    },
            { name: "persona"       , label:'id persona'                 , typeName: 'text'    },
            { name: "consistido"    , label:'consistido'                 , typeName: 'timestamp'},
            { name: "p0"            , label:'sc0'                        , typeName: 'integer' },
            { name: "sc1"           , label:'nombre'                     , typeName: 'text'    },
            { name: "sc_grupo"      , label:'nro grupo'                  , typeName: 'integer' }, //paradores
            { name: "sc2"           , label:'parentesco'                 , typeName: 'integer' },
            { name: "sc3"           , label:'sexo'                       , typeName: 'integer' }, 
            { name: "sc16"          , label:'genero'                     , typeName: 'integer' },
            { name: "sc4"           , label:'edad'                       , typeName: 'integer' },
            { name: "sc5"           , label:'lugar nac'                  , typeName: 'integer' },
            { name: "sc7a"          , label:'nivel'                      , typeName: 'integer' },
            { name: "sc8"           , label:'nivel completo'             , typeName: 'integer' },
            { name: "sc21"          , label:'desde cuando'               , typeName: 'integer' },
            { name: "sc22"          , label:'cuatro o más noches'        , typeName: 'integer' },
            { name: "sc23"          , label:'quedarse en ciudad'         , typeName: 'integer' },
            { name: "sc24"          , label:'lugar anterior'             , typeName: 'integer' },
            { name: "sc25"          , label:'durmio parador'             , typeName: 'integer' }, //paradores
            { name: "sc25a"         , label:'pasó la noche'              , typeName: 'integer' }, //paradores
            { name: "sc9"           , label:'durmio calle'               , typeName: 'integer' }, //calle
            { name: "sc9a"          , label:'pasó la noche'              , typeName: 'integer' }, //calle
            { name: "sc9b"          , label:'en el mismo lugar'          , typeName: 'integer' },
            { name: "sc10"          , label:'tiempo sit calle'           , typeName: 'integer' },
            { name: "sc25b"         , label:'documentación'              , typeName: 'integer' },
            { name: "sc12"          , label:'dni argentino'              , typeName: 'integer' },
            { name: "sc26"          , label:'cuál'                       , typeName: 'text'    },
            { name: "sc27"          , label:'país emisor'                , typeName: 'integer' },
            { name: "sc28"          , label:'número'                     , typeName: 'text'    },          
            { name: "sc18"          , label:'act sem pasada'             , typeName: 'integer' },
            { name: "sc18a"         , label:'trab lo hizo'               , typeName: 'integer' },
            { name: "sc19_1"        , label:'cartoneo'                   , typeName: 'integer' },
            { name: "sc19_2"        , label:'venta amb'                  , typeName: 'integer' },
            { name: "sc19_3"        , label:'changas'                    , typeName: 'integer' },
            { name: "sc19_4"        , label:'pide dinero'                , typeName: 'integer' },            
            { name: "sc19_6"        , label:'otro'                       , typeName: 'integer' },
            { name: "sc19_88"       , label:'NS'                         , typeName: 'integer' },
            { name: "sc19_99"       , label:'NC'                         , typeName: 'integer' },
            { name: "sc20_1"        , label:'jubilación pensión'         , typeName: 'integer' },
            { name: "sc20_2"        , label:'prog CP'                    , typeName: 'integer' },
            { name: "sc20_3"        , label:'AUH'                        , typeName: 'integer' },
            { name: "sc20_7"        , label:'sub habitacional'           , typeName: 'integer' },
            { name: "sc20_4"        , label:'sub o plan'                 , typeName: 'integer' },
            { name: "sc20_5"        , label:'otro'                       , typeName: 'integer' },
            { name: "sc20_6"        , label:'No recibió ningún ingreso'  , typeName: 'integer' },
            { name: "sc20_88"       , label:'NS'                         , typeName: 'integer' },
            { name: "sc20_99"       , label:'NC'                         , typeName: 'integer' },

                       
/* 
            { name: "sc6"           , label:'asiste est educ'            , typeName: 'integer' },
            { name: "sc7"           , label:'nivel'                      , typeName: 'integer' },
            { name: "sc8"           , label:'nivel completo'             , typeName: 'integer' },
            { name: "sc21"          , label:'desde cuando'               , typeName: 'integer' },
            { name: "sc22"          , label:'cuatro o más noches'        , typeName: 'integer' },
            { name: "sc23"          , label:'quedarse en ciudad'         , typeName: 'integer' },
            { name: "sc24"          , label:'lugar anterior'             , typeName: 'integer' },
            { name: "sc9"           , label:'durmio calle'               , typeName: 'integer' },
            { name: "sc9a"          , label:'pasó la noche'              , typeName: 'integer' },
            { name: "sc25"          , label:'durmio parador'             , typeName: 'integer' },
            { name: "sc25a"         , label:'pasó la noche'              , typeName: 'integer' },
            { name: "sc10"          , label:'tiempo sit calle'           , typeName: 'integer' },
            { name: "sc11"          , label:'tiene documento'            , typeName: 'integer' },
            { name: "sc12"          , label:'tuvo dni argentino'         , typeName: 'integer' },
            { name: "sc13"          , label:'documento'                  , typeName: 'integer' },
            { name: "sc14"          , label:'cert disca vig'             , typeName: 'integer' },
            { name: "sc15"          , label:'tuvo cert disca'            , typeName: 'integer' },
            { name: "sc16"          , label:'genero'                     , typeName: 'integer' },
            { name: "sc17_1"        , label:'CESAC'                      , typeName: 'integer' },
            { name: "sc17_2"        , label:'consultorio guardia'        , typeName: 'integer' },
            { name: "sc17_3"        , label:'obra social'                , typeName: 'integer' },
            { name: "sc17_4"        , label:'otro'                       , typeName: 'integer' },
            { name: "sc18"          , label:'act sem pasada'             , typeName: 'integer' },
            { name: "sc19_1"        , label:'cartoneo'                   , typeName: 'integer' },
            { name: "sc19_2"        , label:'venta amb'                  , typeName: 'integer' },
            { name: "sc19_3"        , label:'changas'                    , typeName: 'integer' },
            { name: "sc19_4"        , label:'pide dinero'                , typeName: 'integer' },
            { name: "sc19_5"        , label:'relación dep'               , typeName: 'integer' },
            { name: "sc19_6"        , label:'otro'                       , typeName: 'integer' },
            { name: "sc20_1"        , label:'jubilación pensión'         , typeName: 'integer' },
            { name: "sc20_2"        , label:'prog CP'                    , typeName: 'integer' },
            { name: "sc20_3"        , label:'AUH'                        , typeName: 'integer' },
            { name: "sc20_4"        , label:'sub o plan'                 , typeName: 'integer' },
            { name: "sc20_5"        , label:'otro'                       , typeName: 'integer' },
            { name: "sc20_6"        , label:'No recibió ningún ingreso'  , typeName: 'integer' },
            */
        ],
        primaryKey: ['operativo', 'persona'],
        sql:{       "isReferable": true,
        }
    };
    return def;
}