set search_path= base;
--set role eah_owner;

alter table inconsistencias
    drop column if exists renglon, 
    drop column if exists visita,
    drop column if exists hogar;
   -- drop column if exists vivienda;
  
create or replace function desintegrarpk_trg() returns trigger
  language plpgsql SECURITY DEFINER as
$body$
begin
  new.id_caso := new.pk_integrada->>'id_caso';
  new.vivienda := new.pk_integrada->>'id_caso';
  new.persona := new.pk_integrada->>'persona';
  return new;
end;
$body$;

create trigger desintegrarpk_trg
  before insert or update 
  of pk_integrada
  on inconsistencias
  for each row
  execute procedure desintegrarpk_trg();
