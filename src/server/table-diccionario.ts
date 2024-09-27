"use strict";

import {TableDefinition, TableContext} from "./types-movade";

export function diccionario(context:TableContext):TableDefinition {
    var permitidoeditar = context.user.rol === 'admin' /*||context.puede.diccionarios.editar*/;
    return {
        name: 'diccionario',
        elementName: 'diccionario',
        editable: permitidoeditar,
        fields: [
            { name: "dic_dic"     , typeName: "text"    , nullable:false  },
            { name: "dic_completo", typeName: "boolean"                   },
        ],
        primaryKey: ['dic_dic'],
        detailTables:[
            {table:'dicvar', fields:[{source:'dic_dic', target:'dicvar_dic'}], abr:'V', title:'Dicc. Variables' },
            {table:'dictra', fields:[{source:'dic_dic', target:'dictra_dic'}], abr:'T', title:'Dicc. Traducción'}
        ]
    };
}