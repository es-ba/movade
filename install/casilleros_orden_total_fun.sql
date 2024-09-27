set role to "meta_owner";
set search_path = "meta";

drop type if exists casilleros_recursivo_type cascade;
create type casilleros_recursivo_type as (
  --operativo text,
  orden_total bigint[],
  ultimo_ancestro text--,
  --unidad_analisis text
);

drop function if exists casilleros_recursivo(p_id_casillero text);
drop function if exists casilleros_recursivo(p_operativo text, p_id_casillero text);
create or replace function casilleros_recursivo(p_operativo text, p_id_casillero text) returns casilleros_recursivo_type
  language sql
as
$sql$
    WITH RECURSIVE casilleros_ordenados
              (operativo, id_casillero, ancestro, orden_total             , unidad_analisis) AS (
        SELECT operativo, id_casillero, padre   , array[coalesce(orden,0)], unidad_analisis
          FROM casilleros
          WHERE operativo = p_operativo
            AND id_casillero = p_id_casillero
      UNION ALL
        SELECT casillero_ancestro.operativo, casillero_ancestro.id_casillero, casillero_ancestro.padre, 
               coalesce(casillero_ancestro.orden,0)||co.orden_total,
               casillero_ancestro.unidad_analisis
          FROM casilleros_ordenados co,
               casilleros as casillero_ancestro
          WHERE casillero_ancestro.operativo = co.operativo
            AND casillero_ancestro.id_casillero = co.ancestro 
    )
    SELECT /*operativo, */orden_total, id_casillero as ultimo_ancestro --, unidad_analisis
      FROM casilleros_ordenados 
      where ancestro is null
      order by orden_total;
$sql$;
  
-- /* 
select casilleros_recursivo(operativo, id_casillero) as orden_total, *
  from casilleros
  where tipoc='P' 
  order by operativo, casilleros_recursivo(operativo, id_casillero);
-- */
  