"use strict";

import {TableDefinition, TableContext} from "./types-movade";

export function dictra(context:TableContext):TableDefinition {
    var permitidoeditar = context.user.rol === 'admin'/*||context.puede.diccionarios.editar*/;
    return {
        name: 'dictra',
        elementName: 'dictra',
        editable: permitidoeditar,
        fields: [
            { name: "dictra_dic"     , typeName: "text"     , nullable:false  },
            { name: "dictra_ori"     , typeName: "text"     , nullable:false  },
            { name: "dictra_des"     , typeName: "integer"                    },
            { name: "dictra_texto"   , typeName: "text"                       },
        ], 
        primaryKey: ['dictra_dic', 'dictra_ori'],
        foreignKeys:[
            {references:'diccionario'    , fields: [{source:'dictra_dic',target:'dic_dic'}],displayFields:[]},
        ],
        /*
        constraints:[
            {   
                constraintType:'check', 
                consName:'texto de diccionario inválido', 
                expr:"(comun.cadena_valida(dictra_texto::text, 'castellano'::text)),"
            },
            {   
                constraintType:'check', 
                consName:'texto invalido en dictra_ori de tabla dictra', 
                expr:"(comun.cadena_valida(dictra_ori, 'castellano'::text)),"
            },
        ]
       */
    };
}