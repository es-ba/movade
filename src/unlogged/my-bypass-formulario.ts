import { Respuestas, IdUnidadAnalisis, IdVariable, } from "dmencu/dist/unlogged/unlogged/tipos";
import {setCalculoReaNoRea, buscarNoReaEnRespuestas, getEstructura} from "dmencu/dist/unlogged/unlogged/bypass-formulario";
import { strict as likeAr, beingArray } from "like-ar";

//COPIADO DE ESEDE
//var esNoRea = (respuestas:Respuestas)=>{
//    //TODO GENERALIZAR
//    var estructura = getEstructura();
//    var unidadesARecorrer = ['viviendas','personas'] as IdUnidadAnalisis[];
//    if(estructura.conReaHogar){
//        unidadesARecorrer.splice(1,0,'hogares');
//    }
//    var uaPrincipal = likeAr(estructura.unidades_analisis).find((ua)=>!ua.padre);
//    var esNoRea = false;
//    var codNoRea:string|null= null;
//    let resnorea = buscarNoReaEnRespuestas( unidadesARecorrer,uaPrincipal!,respuestas,estructura.noReas,'no_rea');
//    codNoRea=resnorea.nrcodigo;
//    esNoRea=resnorea.esvalor;
//    return {codNoRea, esNoRea};
//};
//var esNoReaSup = (respuestas:Respuestas)=>{
//    //TODO GENERALIZAR buscarNoreaRespuestas
//    var estructura = getEstructura();
//    var unidadesARecorrerSup = ['viviendas','personas_sup'] as IdUnidadAnalisis[];
//    if(estructura.conReaHogar){
//        unidadesARecorrerSup.splice(1,0,'hogares_sup' as IdUnidadAnalisis);
//    }
//    var uaPrincipal = likeAr(estructura.unidades_analisis).find((ua)=>!ua.padre);
//    var esNoReaSup = false;
//    var codNoReaSup:string|null= null;
//    let resnorea =buscarNoReaEnRespuestas( unidadesARecorrerSup,uaPrincipal!,respuestas,estructura.noReasSup,'no_rea_sup');//con los parametros que necesitariamos para generalizar
//        codNoReaSup=resnorea.nrcodigo;
//        esNoReaSup=resnorea.esvalor;
//    return {codNoReaSup,esNoReaSup}
//}; 
//
//var esRealizada = (respuestas:Respuestas)=>{
//    //TODO GENERALIZAR 
//    //determinar  fin_1, fin_2 se tienen en cuenta esto fue para ut
//    var estructura = getEstructura();
//    var esRea = false;
//    var codRea:number|null= null;
//    if(!respuestas['contacto' as IdVariable]){
//        return {codRea, esRea}
//    }else if(respuestas['contacto' as IdVariable]==2 || respuestas['d3' as IdVariable]==2){
//        codRea = 2;
//        esRea = false;
//    }else{
//        if(estructura.conReaHogar){
//            var reahs: number[]=[] ;
//            var respuestasHs = respuestas['hogares'];
//            if(respuestasHs){
//                for(let respuestasH of respuestasHs){
//                    var reah:number;
//                    var selec:number;
//                    if(respuestasH['entrea' ] != 1||respuestasH['tp']==0){
//                        reah=2;
//                    }else{
//                        selec=respuestasH['cr_num_miembro']
//                        if(respuestasH['personas'] && respuestasH.personas[selec-1] ){
//                            var respuestasP = respuestasH.personas[selec-1];
//                            var resp_entrea_ind = respuestasP['entreaind' as IdVariable ];
//                            var resp_fin1_ind = respuestasP['fin_1' as IdVariable ];
//                            var resp_dominio=respuestas['vdominio' as IdVariable];
//                            //console.log('dominio ', resp_dominio);
//                            //resp_entrea_ind =resp_dominio=='5'?1:resp_entrea_ind;   //ajuste para dominio 5
//                        // console.log('resp_entrea_ind ', resp_entrea_ind);  
//                            if( resp_entrea_ind==1 ){ 
//                                if(resp_fin1_ind==1){ 
//                                    reah = 1    
//                                }else if (resp_fin1_ind==2){
//                                    reah=2;
//                                }else {
//                                    reah=3;
//                                }    
//                            }else if (resp_entrea_ind==2){
//                                reah=2;
//                            }else{ // ver este caso 
//                                reah=3;
//                            }
//                        }else{ // ver este caso 
//                            reah=3;
//                        } 
//                    } 
//                    reahs.push(reah);
//                } //for
//                if (reahs.every(rh=>rh==1)){
//                    codRea = 1;
//                    esRea = true;
//                }else if(reahs.every(rh=>rh==2)){
//                    codRea = 2;
//                    esRea = false;
//                }else if(reahs.every(rh=>rh==1||rh==3)){
//                    codRea = 3;
//                    esRea = false;
//                }else{
//                    codRea = 4;
//                    esRea = false;
//                }
//            }else{
//                codRea = 3;
//                esRea = false;
//            }
//        }else{
//            //aca va lo de sin rea hogar, primera versión
//            var reah:number;
//            var selec:number;
//            selec=respuestas['cr_num_miembro']
//            if(respuestas['personas'] && respuestas.personas[selec-1] ){
//                var respuestasP = respuestas.personas[selec-1];
//                var resp_entrea_ind = respuestasP['entreaind' as IdVariable ];
//                var resp_sd1  = respuestasP['sd1' as IdVariable ];
//                var resp_sd2  = respuestasP['sd2' as IdVariable ];
//                var resp_sd2a = respuestasP['sd2a' as IdVariable ];
//                var resp_sd3  = respuestasP['sd3' as IdVariable ];
//                var resp_sd4  = respuestasP['sd4' as IdVariable ];
//                var resp_ac1  = respuestasP['ac1' as IdVariable ];
//                var resp_ac1a = respuestasP['ac1a' as IdVariable ];
//                var resp_ac2  = respuestasP['ac2' as IdVariable ];
//                var resp_ac2a = respuestasP['ac2a' as IdVariable ];
//                var resp_dominio=respuestas['vdominio' as IdVariable];
//                 // console.log('resp_entrea_ind ', resp_entrea_ind);  
//                if( resp_entrea_ind==1 ){ 
//                    if(resp_sd1==1 && resp_sd2==2 && resp_sd2a==2 && resp_sd3==1 && resp_sd4==1 ){
//                      if (resp_ac1!=null && resp_ac1a!=null && resp_ac2!=null && resp_ac2a!=null && resp_ac1==resp_ac1a && resp_ac2==resp_ac2a){ 
//                            reah=1 
//                          }else {
//                            reah=3
//                          }                            
//                    }else if (resp_sd1==2 || resp_sd2==1 || resp_sd2a==1|| resp_sd3==2 || resp_sd4==2){
//                            reah=2;
//                    }else {
//                            reah=3 
//                    }        
//                }else if (resp_entrea_ind==2){
//                            reah=2;
//                }else if (resp_entrea_ind==3){
//                            reah=3;            
//                }else{ // ver este caso 
//                           reah=3;
//                }
//            }else {
//                reah=3;
//            }            
//            if (reah==1){
//               codRea = 1;
//               esRea = true;
//            }else if(reah==2){
//               codRea = 2;
//               esRea = false;
//            }else if(reah==3){
//               codRea = 3;
//               esRea = false;
//            }else{ //aqui hay una sola vivienda-hogar no debería entrar por aqui pero sería el otros para atrapar casos no considerados
//               codRea = 4;
//               esRea = false;
//            }
//        }    
//    }
//    return {codRea,esRea}
//};
//var esRealizadaSup=(respuestas:Respuestas)=>{
//    var estructura = getEstructura();
//    var esReaSup = false;
//    var codReaSup:number|null= null;
//    if(!respuestas['confir_tel_sup' as IdVariable] /*&& !respuestas['modo_sup' as IdVariable]*/){
//        return {codReaSup, esReaSup}
//    }else if (respuestas['confir_tel_sup' as IdVariable]==2 ||respuestas['confir_dom_sup' as IdVariable]==2||respuestas['entrea_sup' as IdVariable]==2){
//        codReaSup = 2;
//        esReaSup = false;
//    }else{
//        if(estructura.conReaHogar){
//            var reahs: number[]=[] ;
//            var respuestasHs = respuestas['hogares_sup' as IdUnidadAnalisis];
//            if(respuestasHs){
//                for(let respuestasH of respuestasHs){
//                    var reah:number;
//                    var selec:number;
//                    if(respuestasH['entrea_hog'] == 2||respuestasH['sp4']==3||respuestasH['spr2_sup']==2||respuestasH['total_rango_sup']==0||respuestasH['spr3_sup']==2){
//                        reah=2;
//                    }else{
//                        if(respuestasH['entrea_hog']){
//                            reah = 1;
//                        }else {
//                            reah=3;
//                        }     
//                    }
//                    reahs.push(reah);
//                }
//                if (reahs.every(rh=>rh==1)){
//                    codReaSup = 1;
//                    esReaSup = true;
//                }else if(reahs.every(rh=>rh==2)){
//                    codReaSup = 2;
//                    esReaSup = false;
//                }else if(reahs.every(rh=>rh==1||rh==3)){
//                    codReaSup = 3;
//                    esReaSup = false;
//                }else{
//                    codReaSup = 4;
//                    esReaSup = false;
//                }
//            } else{
//                codReaSup = 3;
//                esReaSup = false;
//            }
//        }else{
//            //aca va lo de sin rea hogar
//            var resp_entrea_sup = respuestas['entrea_sup' as IdVariable ];
//            var resp_entrevista = respuestas['entrevista' as IdVariable ];
//            var resp_sup_ind = respuestas['sup_ind' as IdVariable ];
//            if(resp_entrevista==3||resp_sup_ind==2){
//                codReaSup=2;
//                esReaSup = false;
//            }else{
//                if(resp_entrea_sup==1 && resp_entrevista!=3 && resp_sup_ind==1){
//                    codReaSup=1;
//                    esReaSup = false;
//                }else {
//                    codReaSup=3;
//                    esReaSup = false;
//                }     
//            }
//            
//        }
//    }
//    return {codReaSup,esReaSup}
//}
//
//setCalculoReaNoRea(esNoRea, esNoReaSup, esRealizada, esRealizadaSup);