/*
set role to "meta_owner";
set search_path = "meta";
-- */
create or replace function casilleros_jerarquizados(p_operativo text, p_id_casillero text) returns jsonb
  language sql
as
$SQL$
  select jsonb_build_object('data',to_jsonb(p.*),'childs',
    coalesce((
      select jsonb_agg(casilleros_jerarquizados(h.operativo, h.id_casillero) order by orden )
        from casilleros h
        where h.operativo = p_operativo
          and h.padre = p_id_casillero
      ),'[]'::jsonb))
    from (select c.*, t.desp_casillero, t.desp_hijos
            from casilleros c inner join tipoc t on t.tipoc=c.tipoc
          ) p
    where p.operativo = p_operativo
      and p.id_casillero = p_id_casillero;
$SQL$;

create or replace function casilleros_jerarquizados(p_operativo text) returns jsonb
  language sql
as
$SQL$
  select jsonb_object_agg(casillero,casilleros_jerarquizados(operativo, casillero))
    from casilleros
    where operativo=p_operativo 
      and padre is null;
$SQL$;

-- select * from casilleros_jerarquizados('FURV');
