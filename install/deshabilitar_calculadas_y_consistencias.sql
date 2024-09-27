set search_path=movade, dbo, comun;
--set role movade241_muleto_admin;

update variables set activa=false
  where clase='calculada';

--dejar pocas consistencias para probar
update consistencias
  set activa=false
  where consistencia !~'^u8|^o1'; 
