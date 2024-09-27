set role to postgres;

CREATE OR REPLACE FUNCTION control_created_names()
  RETURNS event_trigger
  LANGUAGE plpgsql AS
$BODY$
DECLARE
  obj record;
  x text;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    if user<>'postgres' and user<>'movade_owner' then 
      if obj.object_identity !~* '_calc($|_pkey|\(\))' then
        RAISE 'no se puede % % % %  para %',obj.command_tag,obj.object_type,obj.schema_name,obj.object_identity,user;
      end if;
    end if;
  END LOOP;
END
$BODY$;

DROP EVENT TRIGGER IF EXISTS control_created_names;
CREATE EVENT TRIGGER control_created_names
  ON ddl_command_end
  EXECUTE PROCEDURE control_created_names();

set role to movade_owner;