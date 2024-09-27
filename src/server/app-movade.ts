"use strict";

import * as procesamiento from "procesamiento";
import {ProceduresMovade} from "./procedures-movade";

import {AppProcesamientoType, Response, TableContext} from "procesamiento";

import { FieldDefinition, MenuInfoBase, getDomicilioFields } from "dmencu";

import * as pg from "pg-promise-strict";
import * as miniTools from "mini-tools";
import * as fs from "fs-extra";

import * as yazl from "yazl";
import { NextFunction } from "express-serve-static-core";

import { diccionario         } from "./table-diccionario";
import { dicvar              } from "./table-dicvar";
import { dictra              } from "./table-dictra";
import { personas            } from "./table-personas";

import {defConfig} from "./def-config"
import { Request } from "rel-enc";

import * as cookieParser from 'cookie-parser';

const APP_DM_VERSION="#24-08-27";

interface Context extends procesamiento.Context{
  puede:object
  superuser?:true
}

type MenuInfoMapa = {
  menuType:'mapa'
} & procesamiento.MenuInfoBase;

type MenuInfo = procesamiento.MenuInfo | MenuInfoMapa 
     | {menuType:'ingresarFormulario', label?:string, name:string} | {menuType:'menu', label?:string, name:string, menuContent:MenuInfo[]};
type MenuDefinition = {menu:MenuInfo[]}

export type Constructor<T> = new(...args: any[]) => T;
export function emergeAppmovade<T extends Constructor<AppProcesamientoType>>(Base:T){
  return class AppMovade extends Base{
    constructor(...args:any[]){ 
        super(args); 
    }
    
    async getProcedures(){
        var parentProc = await super.getProcedures();
        return parentProc.concat(ProceduresMovade);
    }

    addSchrödingerServices(mainApp:procesamiento.Express, baseUrl:string){
        let be=this;
        super.addSchrödingerServices(mainApp, baseUrl);
        mainApp.use(cookieParser());
        mainApp.use(function(req:Request,res:Response, next:NextFunction){
            if(req.session && !req.session.install){
                req.session.install=Math.random().toString().replace('.','');
            }
            next();
        })
    }
    addLoggedServices(){
        var be = this;
        super.addLoggedServices();
    }
    
    configStaticConfig(){
        super.configStaticConfig();
        this.setStaticConfig(defConfig);
    }

    clientIncludes(req:Request, hideBEPlusInclusions?:boolean){
        return super.clientIncludes(req, hideBEPlusInclusions).concat([
            {type:'js' , src:'client.js' },
            {type:'js' , src:'my-render-formulario.js' },
            {type:'js' , src:'my-bypass-formulario.js' },
            {type:'css', file:'movade.css'     },
        ])
    }

    createResourcesForCacheJson(parameters:Record<string,any>){
        var be = this;
        var jsonResult:any = super.createResourcesForCacheJson(parameters);
        jsonResult.version = APP_DM_VERSION;
        jsonResult.appName = 'movade';
        jsonResult.cache=jsonResult.cache.concat([
            "my-render-formulario.js",
            'my-bypass-formulario.js'
        ])
        return jsonResult
    }
    getColorsJson(sufijo:'_test'|'_capa'|''){
        let miSufijo: '_prod'|'_test'|'_capa' = sufijo || '_prod';
        let coloresEntornos = {
            "_prod":"#067DB5",
            "_test":"#C47208",
            "_capa":"#880996",
        }
        return {
            "start_url": "../campo",
            "display": "standalone",
            "theme_color": "#3F51B5",
            "background_color": coloresEntornos[miSufijo]
        }
    }
    getMenuVarios(context:Context){
        let menuVarios = super.getMenuVarios(context);
        menuVarios.menuContent = menuVarios.menuContent.filter((menuInfo)=>!['abrir_encuesta','hoja_ruta'].includes(menuInfo.name));
        return menuVarios;
    }
    getMenuAsignacion(context:Context){
        let menuAsignacion = super.getMenuAsignacion(context);
        menuAsignacion.menuContent = menuAsignacion.menuContent.filter((menuInfo)=>!['recuperador','supervisor'].includes(menuInfo.name));
        return menuAsignacion;
    }
    getMenuRecepcion(context:Context){
        let menuRecepcion = super.getMenuRecepcion(context);
        menuRecepcion.menuContent = menuRecepcion.menuContent.filter((menuInfo)=>!['recuperador','supervisor','mis_supervisores'].includes(menuInfo.name));
        return menuRecepcion;
    }
    getMenu(context:Context){
        let menuDef:MenuDefinition = super.getMenu(context);
        menuDef.menu = menuDef.menu.filter((menuInfo)=>
            !['supervision','tareas_tem_fin_campo','tareas_tem_analisis_campo'].includes(menuInfo.name)
        );
        menuDef.menu.splice(2,0,
            {menuType:'table' , name:'ingresar' , table:'tareas_tem_ingreso', ff:{tarea:'encu', asignado:context.user.idper } }
        );
        return menuDef;
    }
    getMenuVarios(context:Context) { 
        let menuVarios = super.getMenuVarios(context);
        menuVarios.menuContent = menuVarios.menuContent.filter((menuInfo)=>
            !['encuestador_dms_mostrar','tareas_tem_fin_campo','tareas_tem_analisis_campo'].includes(menuInfo.name)
        );
        return menuVarios;
    }
    getMenuControles(context:Context){ 
        return super.getMenuControles(context).filter((menuInfo)=>
            !['encuestas_procesamiento_pasar','dominio','zona','comuna'].includes(menuInfo.name)
        );
    }

    prepareGetTables(){
        var be=this;
        super.prepareGetTables();
        this.getTableDefinition={
            ...this.getTableDefinition
            , personas            
            , diccionario
            , dicvar
            , dictra        
        }
        delete(this.getTableDefinition.viviendas);
        delete(this.getTableDefinition.personas_sup);
        delete(this.getTableDefinition.hogares);
        delete(this.getTableDefinition.hogares_sup);
        delete(this.getTableDefinition.visitas);
        delete(this.getTableDefinition.visitas_sup);
        
        //be.appendToTableDefinition('inconsistencias',function(tableDef, context){
        //    tableDef.sql={...tableDef.sql, isTable:true};
        //    tableDef.fields.splice(2,0,
        //        {name:'id_caso', typeName:'text'   , label:'caso'   , editable: false},
        //    );
        //    tableDef.editable=tableDef.editable || (<TableContext>context).puede.encuestas.justificar;
//
        //    tableDef.fields=tableDef.fields.filter(f=>![/*'vivienda',*/'hogar','visita'].includes(f.name ))
        //    tableDef.fields.forEach(function(field){
        //        if(field.name=='vivienda'){
        //            field.visible=false;
        //        }
        //        if(field.name=='pk_integrada'){
        //            field.visible=false;
        //        }
        //        if(field.name=='justificacion'){
        //            field.editable=(<TableContext>context).forDump || (<TableContext>context).puede.encuestas.justificar;
        //        }
        //    })
        //})
        be.appendToTableDefinition('tareas_tem_ingreso', function (tableDef,context) {
            //let domicilioFieldNames:string[] = getDomicilioFields().map((fieldDef)=>fieldDef.name);
            //tableDef.hiddenColumns = tableDef.hiddenColumns?.concat([...domicilioFieldNames,'telefono']);
        });
    }
  }
}