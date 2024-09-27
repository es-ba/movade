drop schema if exists "dbo" cascade;
create schema "dbo";
grant usage on schema "dbo" to "movade_user";
grant create on schema "dbo" to "movade_user";

CREATE OR REPLACE FUNCTION dbo.dic_tradu(
    p_dic text,
    p_origen text)
    RETURNS integer
    LANGUAGE 'sql'
    STABLE 
AS $BODY$
  select dictra_des from dictra where dictra_dic=p_dic and dictra_ori=comun.cadena_normalizar(p_origen)
$BODY$;

CREATE OR REPLACE FUNCTION dbo.dic_parte(
    p_dic text,
    p_origen text,
    p_destino integer)
    RETURNS boolean
    LANGUAGE 'sql'
    STABLE 
AS $BODY$
  select p_origen ~* 
    ('(\m' || coalesce((select string_agg(dictra_ori, '\M|\m') 
      from dictra
      where dictra_dic=p_dic and dictra_des=p_destino),'')|| '\M)' )
$BODY$;
