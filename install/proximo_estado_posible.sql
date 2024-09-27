CREATE OR REPLACE FUNCTION proximo_estado_posible(p_operativo text, p_id_caso text) RETURNS jsonb
  LANGUAGE sql
AS
$SQL$
  select jsonb_agg(to_jsonb(p.estado))
    from (select split_part(nullif(setting,''),' ',1) as user_deduc from pg_settings where name='application_name') as d,
         lateral (select rol from usuarios where usuario = user_deduc) u,
         lateral (select estado from grupo_personas where operativo = p_operativo and id_caso = p_id_caso and consistido >= modificado) gp,
         lateral (select rol,estado from estados_roles where estados_roles.rol=u.rol and estados_roles.estado=gp.estado and puede_sacar_estado) r,
         lateral (select estado from estados_roles where estados_roles.rol=u.rol and puede_poner_estado and estado <> r.estado) p;
$SQL$;