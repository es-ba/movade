"use strict";

import {TableDefinition, TableContext} from "./types-movade";

export function dicvar(context:TableContext):TableDefinition {
    var permitidoeditar = context.user.rol === 'admin'/*||context.puede.diccionarios.editar*/;
    return {
        name: 'dicvar',
        elementName: 'dicvar',
        editable: permitidoeditar,
        fields: [
            { name: "dicvar_dic"     , typeName: "text"     , nullable:false  },
            { name: "dicvar_var"     , typeName: "text"     , nullable:false  }
        ], 
        primaryKey: ['dicvar_dic', 'dicvar_var'],
        foreignKeys:[
            {references:'diccionario' , fields: [{source:'dicvar_dic',target:'dic_dic'}],displayFields:[]},
        ]
    };
}