do $SQL_DUMP$
 begin
----
set search_path = movade;
----
drop table if exists "movade241_supervision_calculada";
----
drop table if exists "movade241_personas_calculada";
----
drop table if exists "movade241_grupo_personas_calculada";
----
create table "movade241_grupo_personas_calculada" (
  "operativo" text, 
  "id_caso" text, 
  "cant_0a14_mu" bigint, 
  "cant_0a14_no_obs" bigint, 
  "cant_0a14_tot" bigint, 
  "cant_0a14_va" bigint, 
  "cant_15a18_mu" bigint, 
  "cant_15a18_no_obs" bigint, 
  "cant_15a18_tot" bigint, 
  "cant_15a18_va" bigint, 
  "cant_19a59_mu" bigint, 
  "cant_19a59_no_obs" bigint, 
  "cant_19a59_tot" bigint, 
  "cant_19a59_va" bigint, 
  "cant_60ymas_mu" bigint, 
  "cant_60ymas_no_obs" bigint, 
  "cant_60ymas_tot" bigint, 
  "cant_60ymas_va" bigint, 
  "cant_no_obs_mu" bigint, 
  "cant_no_obs_no_obs" bigint, 
  "cant_no_obs_tot" bigint, 
  "cant_no_obs_va" bigint, 
  "cant_tot_mu" bigint, 
  "cant_tot_no_obs" bigint, 
  "cant_tot_tot" bigint, 
  "cant_tot_va" bigint, 
  "cant_per" bigint, 
  "cant_refe" bigint
, primary key ("operativo", "id_caso")
);
grant select, insert, update, references on "movade241_grupo_personas_calculada" to movade_user;
grant all on "movade241_grupo_personas_calculada" to movade_owner;



create table "movade241_personas_calculada" (
  "operativo" text, 
  "id_caso" text, 
  "p0" bigint, 
  "sexor" bigint
, primary key ("operativo", "id_caso", "p0")
);
grant select, insert, update, references on "movade241_personas_calculada" to movade_user;
grant all on "movade241_personas_calculada" to movade_owner;



create table "movade241_supervision_calculada" (
  "recorrido" bigint, 
  "cant_form" bigint
, primary key ("recorrido")
);
grant select, insert, update, references on "movade241_supervision_calculada" to movade_user;
grant all on "movade241_supervision_calculada" to movade_owner;



-- conss
alter table "movade241_grupo_personas_calculada" add constraint "operativo<>''" check ("operativo"<>'');
alter table "movade241_grupo_personas_calculada" add constraint "id_caso<>''" check ("id_caso"<>'');
alter table "movade241_personas_calculada" add constraint "operativo<>''" check ("operativo"<>'');
alter table "movade241_personas_calculada" add constraint "id_caso<>''" check ("id_caso"<>'');
-- FKs
alter table "movade241_grupo_personas_calculada" add constraint "movade241_grupo_personas_calculada grupo_personas REL" foreign key ("operativo", "id_caso") references "grupo_personas" ("operativo", "id_caso")  on delete cascade on update cascade;
alter table "movade241_personas_calculada" add constraint "movade241_personas_calculada personas REL" foreign key ("operativo", "id_caso", "p0") references "personas" ("operativo", "id_caso", "p0")  on delete cascade on update cascade;
alter table "movade241_supervision_calculada" add constraint "movade241_supervision_calculada supervision REL" foreign key ("recorrido") references "supervision" ("recorrido")  on delete cascade on update cascade;
-- index
create index "operativo,id_caso 4 movade241_grupo_personas_calculada IDX" ON "movade241_grupo_personas_calculada" ("operativo", "id_caso");
create index "operativo,id_caso,p0 4 movade241_personas_calculada IDX" ON "movade241_personas_calculada" ("operativo", "id_caso", "p0");
create index "recorrido 4 movade241_supervision_calculada IDX" ON "movade241_supervision_calculada" ("recorrido");
-- functions

----
do $SQL_ENANCE$
 begin
PERFORM enance_table('movade241_grupo_personas_calculada','operativo,id_caso');
PERFORM enance_table('movade241_personas_calculada','operativo,id_caso,p0');
PERFORM enance_table('movade241_supervision_calculada','recorrido');
end
$SQL_ENANCE$;
----
INSERT INTO "movade241_grupo_personas_calculada" ("operativo","id_caso") SELECT "operativo","id_caso" FROM "grupo_personas";
----
INSERT INTO "movade241_personas_calculada" ("operativo","id_caso","p0") SELECT "operativo","id_caso","p0" FROM "personas";
----
INSERT INTO "movade241_supervision_calculada" ("recorrido") SELECT "recorrido" FROM "supervision";
----
CREATE OR REPLACE FUNCTION movade.gen_fun_var_calc() RETURNS TEXT
          LANGUAGE PLPGSQL
        AS
        $BODY$
        BEGIN

      UPDATE movade241_grupo_personas_calculada
        SET 
            cant_0a14_mu = personas_agg.cant_0a14_mu,
  cant_0a14_no_obs = personas_agg.cant_0a14_no_obs,
  cant_0a14_tot = personas_agg.cant_0a14_tot,
  cant_0a14_va = personas_agg.cant_0a14_va,
  cant_15a18_mu = personas_agg.cant_15a18_mu,
  cant_15a18_no_obs = personas_agg.cant_15a18_no_obs,
  cant_15a18_tot = personas_agg.cant_15a18_tot,
  cant_15a18_va = personas_agg.cant_15a18_va,
  cant_19a59_mu = personas_agg.cant_19a59_mu,
  cant_19a59_no_obs = personas_agg.cant_19a59_no_obs,
  cant_19a59_tot = personas_agg.cant_19a59_tot,
  cant_19a59_va = personas_agg.cant_19a59_va,
  cant_60ymas_mu = personas_agg.cant_60ymas_mu,
  cant_60ymas_no_obs = personas_agg.cant_60ymas_no_obs,
  cant_60ymas_tot = personas_agg.cant_60ymas_tot,
  cant_60ymas_va = personas_agg.cant_60ymas_va,
  cant_no_obs_mu = personas_agg.cant_no_obs_mu,
  cant_no_obs_no_obs = personas_agg.cant_no_obs_no_obs,
  cant_no_obs_tot = personas_agg.cant_no_obs_tot,
  cant_no_obs_va = personas_agg.cant_no_obs_va,
  cant_tot_mu = personas_agg.cant_tot_mu,
  cant_tot_no_obs = personas_agg.cant_tot_no_obs,
  cant_tot_va = personas_agg.cant_tot_va,
  cant_refe = personas_agg.cant_refe
            FROM (
                     SELECT
                         count(nullif(case when null2zero(personas.p3) >= 0 and null2zero(personas.p3) <= 14 and null2zero(personas.p2) = 2 then true else null end,false)) as cant_0a14_mu,
            count(nullif(case when null2zero(personas.p3) >= 0 and null2zero(personas.p3) <= 14 and (null2zero(personas.p2) = 88 or null2zero(personas.p2) = 99 or null2zero(personas.p2) = 777) then true else null end,false)) as cant_0a14_no_obs,
            count(nullif(case when null2zero(personas.p3) >= 0 and null2zero(personas.p3) <= 14 then true else null end,false)) as cant_0a14_tot,
            count(nullif(case when null2zero(personas.p3) >= 0 and null2zero(personas.p3) <= 14 and null2zero(personas.p2) = 1 then true else null end,false)) as cant_0a14_va,
            count(nullif(case when null2zero(personas.p3) >= 15 and null2zero(personas.p3) <= 18 and null2zero(personas.p2) = 2 then true else null end,false)) as cant_15a18_mu,
            count(nullif(case when null2zero(personas.p3) >= 15 and null2zero(personas.p3) <= 18 and (null2zero(personas.p2) = 88 or null2zero(personas.p2) = 99 or null2zero(personas.p2) = 777) then true else null end,false)) as cant_15a18_no_obs,
            count(nullif(case when null2zero(personas.p3) >= 15 and null2zero(personas.p3) <= 18 then true else null end,false)) as cant_15a18_tot,
            count(nullif(case when null2zero(personas.p3) >= 15 and null2zero(personas.p3) <= 18 and null2zero(personas.p2) = 1 then true else null end,false)) as cant_15a18_va,
            count(nullif(case when null2zero(personas.p3) >= 19 and null2zero(personas.p3) <= 59 and null2zero(personas.p2) = 2 then true else null end,false)) as cant_19a59_mu,
            count(nullif(case when null2zero(personas.p3) >= 19 and null2zero(personas.p3) <= 59 and (null2zero(personas.p2) = 88 or null2zero(personas.p2) = 99 or null2zero(personas.p2) = 777) then true else null end,false)) as cant_19a59_no_obs,
            count(nullif(case when null2zero(personas.p3) >= 19 and null2zero(personas.p3) <= 59 then true else null end,false)) as cant_19a59_tot,
            count(nullif(case when null2zero(personas.p3) >= 19 and null2zero(personas.p3) <= 59 and null2zero(personas.p2) = 1 then true else null end,false)) as cant_19a59_va,
            count(nullif(case when null2zero(personas.p3) >= 60 and null2zero(personas.p3) <= 150 and null2zero(personas.p2) = 2 then true else null end,false)) as cant_60ymas_mu,
            count(nullif(case when null2zero(personas.p3) >= 60 and null2zero(personas.p3) <= 150 and (null2zero(personas.p2) = 88 or null2zero(personas.p2) = 99 or null2zero(personas.p2) = 777) then true else null end,false)) as cant_60ymas_no_obs,
            count(nullif(case when null2zero(personas.p3) >= 60 and null2zero(personas.p3) <= 150 then true else null end,false)) as cant_60ymas_tot,
            count(nullif(case when null2zero(personas.p3) >= 60 and null2zero(personas.p3) <= 150 and null2zero(personas.p2) = 1 then true else null end,false)) as cant_60ymas_va,
            count(nullif(case when (null2zero(personas.p3) = 777 or null2zero(personas.p3) = 888 or null2zero(personas.p3) = 999) and null2zero(personas.p2) = 2 then true else null end,false)) as cant_no_obs_mu,
            count(nullif(case when (null2zero(personas.p3) = 777 or null2zero(personas.p3) = 888 or null2zero(personas.p3) = 999) and (null2zero(personas.p2) = 88 or null2zero(personas.p2) = 99 or null2zero(personas.p2) = 777) then true else null end,false)) as cant_no_obs_no_obs,
            count(nullif(case when null2zero(personas.p3) = 777 or null2zero(personas.p3) = 888 or null2zero(personas.p3) = 999 then true else null end,false)) as cant_no_obs_tot,
            count(nullif(case when (null2zero(personas.p3) = 777 or null2zero(personas.p3) = 888 or null2zero(personas.p3) = 999) and null2zero(personas.p2) = 1 then true else null end,false)) as cant_no_obs_va,
            count(nullif(case when null2zero(personas.p2) = 2 then true else null end,false)) as cant_tot_mu,
            count(nullif(case when null2zero(personas.p2) = 88 or null2zero(personas.p2) = 99 or null2zero(personas.p2) = 777 then true else null end,false)) as cant_tot_no_obs,
            count(nullif(case when null2zero(personas.p2) = 1 then true else null end,false)) as cant_tot_va,
            count(nullif(case when null2zero(personas.p1) = 1 then true else null end,false)) as cant_refe
                       FROM "grupo_personas" JOIN "personas" ON "grupo_personas"."id_caso"="personas"."id_caso"
                       WHERE movade241_grupo_personas_calculada.PK = personas.fPK
                   ) personas_agg

    WHERE "grupo_personas"."id_caso"="movade241_grupo_personas_calculada"."id_caso";

      UPDATE movade241_grupo_personas_calculada
        SET 
            cant_tot_tot = personas_agg.cant_tot_tot,
  cant_per = personas_agg.cant_per
            FROM (
                     SELECT
                         count(nullif(true,false)) as cant_tot_tot,
            count("p0") as cant_per
                       FROM "grupo_personas" join "personas"ON "grupo_personas"."id_caso"="personas"."id_caso"
                       WHERE movade241_grupo_personas_calculada.PK = "grupo_personas".PK

                   ) personas_agg
            
    WHERE "grupo_personas"."id_caso"="movade241_grupo_personas_calculada"."id_caso";

      UPDATE movade241_personas_calculada
        SET 
            sexor = null2zero(referente.p2)
            FROM "grupo_personas" JOIN "personas" ON "grupo_personas"."id_caso"="personas"."id_caso" LEFT JOIN (
                    SELECT "referente".* 
                      FROM "personas" "referente"
                    ) "referente" ON "referente"."id_caso"="grupo_personas"."id_caso" AND "referente"."p0"='1'
            
    WHERE "personas"."id_caso"="movade241_personas_calculada"."id_caso" AND "personas"."p0"="movade241_personas_calculada"."p0";

      UPDATE movade241_supervision_calculada
        SET 
            cant_form = grupo_personas_agg.cant_form
            FROM (
                     SELECT
                         count(nullif(true,false)) as cant_form
                      FROM "grupo_personas"
                      WHERE movade241_supervision_calculada
                      
                   ) grupo_personas_agg        

    WHERE "supervision"."recorrido"="movade241_supervision_calculada"."recorrido";
          RETURN 'OK';
        END;
        $BODY$;
----
perform gen_fun_var_calc();
----

        UPDATE operativos SET calculada=now()::timestamp(0) WHERE operativo='movade241';
        UPDATE tabla_datos SET generada=now()::timestamp(0) WHERE operativo='movade241' AND tipo='calculada';
----
end
$SQL_DUMP$--- generado: Wed Apr 17 2019 15:02:49 GMT-0300 (GMT-03:00)
