set role postgres;
ALTER TABLE IF EXISTS base.movade241_grupo_personas_calculada
    OWNER to movade241_admin;
ALTER TABLE IF EXISTS base.movade241_personas_calculada
    OWNER to movade241_admin;
ALTER TABLE IF EXISTS base.movade241_coordinacion_calculada
    OWNER to movade241_admin;
    
GRANT ALL ON SCHEMA comun TO movade241_admin;
GRANT ALL ON SCHEMA comun TO movade241_owner;
    