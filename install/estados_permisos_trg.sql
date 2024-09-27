
CREATE OR REPLACE FUNCTION estados_permiso_ingresar(p_estado text) RETURNS boolean
  LANGUAGE sql
AS
$SQL$
  select puede_ingresar and habilitado
    from (select split_part(nullif(setting,''),' ',1) as user_deduc from pg_settings where name='application_name') as d,
         lateral (select rol from usuarios where usuario = user_deduc) u,
         lateral (select puede_ingresar from estados_roles where estados_roles.rol=u.rol and estados_roles.estado=p_estado) r,
         lateral (select habilitado from roles_permisos where roles_permisos.rol=u.rol and roles_permisos.permiso='encuestas' and roles_permisos.accion='ingresar' ) p;
$SQL$;

CREATE OR REPLACE FUNCTION estados_permiso_ingresar_trg()
  RETURNS trigger
   language plpgsql
as
$BODY$
declare
  v_puede_ingresar boolean;
  v_estado text;
begin
  if tg_table_name='grupo_personas' then
    v_estado=new.estado;  
  else
    select estado into v_estado from grupo_personas where operativo=new.operativo and id_caso=new.id_caso;
  end if;
  select estados_permiso_ingresar(v_estado) into v_puede_ingresar;
  if v_puede_ingresar then
    if tg_table_name='grupo_personas' then
      new.modificado=current_timestamp;
    else
      update grupo_personas set modificado=current_timestamp where operativo=new.operativo and id_caso=new.id_caso;
    end if; 
    return new;
  else
    raise exception 'No está autorizado para ingresar formularios en estado %',v_estado;
    return null;
  end if;
end;      
$BODY$;

DROP TRIGGER IF EXISTS estados_permiso_ingresar_trg ON grupo_personas;
CREATE TRIGGER estados_permiso_ingresar_trg
  BEFORE UPDATE
  ON grupo_personas
  FOR EACH ROW
    WHEN  (not(new.consistido is distinct from old.consistido) AND (new.estado = old.estado))
  EXECUTE PROCEDURE estados_permiso_ingresar_trg(); 

DROP TRIGGER IF EXISTS estados_permiso_ingresar_trg ON personas;
CREATE TRIGGER estados_permiso_ingresar_pr_trg
  BEFORE INSERT OR UPDATE
  ON personas
  FOR EACH ROW
  EXECUTE PROCEDURE estados_permiso_ingresar_trg();  