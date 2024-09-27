--set role ut_owner;
--de sieh1
CREATE OR REPLACE FUNCTION comun.fechadma(
	p_dia bigint,
	p_mes bigint,
	p_anio bigint)
    RETURNS text
    LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
  fecha text;
  mes   text;
  dia   text;
  anio  text;
BEGIN
  IF p_dia is null THEN
     RETURN '';
  END IF;
  IF length(p_dia::text)=1 THEN
     dia='0'||p_dia::text;
  ELSE
     dia=p_dia::text;
  END IF;  
  IF p_mes is null THEN
     RETURN '';
  END IF;
  IF length(p_mes::text)=1 THEN
     mes='0'||p_mes::text;
  ELSE
     mes=p_mes::text;
  END IF;    
  IF p_anio is null THEN
     RETURN '';
  ELSE
     anio=p_anio::text;
  END IF;
  fecha=dia||'/'||mes||'/'||anio;
  IF es_fecha(fecha)=0 THEN  
	RETURN '';
  END IF;
  RETURN fecha;
    
END;
/*
     select esperado, comun.fechadma(dia,mes,anio) resultado
      from 
      (select '29/12/2012' as esperado, 29 as dia, 12 as mes, 2012 as anio
      union select '01/02/1925' as esperado, 1 as dia, 2 as mes, 1925 as anio
      union select '' as esperado, 49 as dia, 12 as mes, 2012 as anio
      union select '' as esperado, 31 as dia, 2 as mes, 2012 as anio
      union select '' as esperado, 31 as dia, 1 as mes, 12 as anio
      union select '' as esperado, 31 as dia, 2 as mes, 1972 as anio
      union select '31/01/1970' as esperado, 31 as dia, 1 as mes, 1970 as anio
      union select '' as esperado, null, 1 as mes, 1970 as anio
      union select '' as esperado, 2, null, 1970 as anio
      union select '' as esperado, 2, 3, null
      ) x
      where esperado is distinct from comun.fechadma(dia,mes,anio) 
 */
$BODY$;
--de sieh1
CREATE OR REPLACE FUNCTION comun.es_fecha(
	valor text)
    RETURNS integer
    LANGUAGE 'plpgsql'
AS $BODY$
DECLARE bisiesto boolean;
DECLARE v_fechas_array integer[];
DECLARE v_anio_extraido integer;
DECLARE v_mes_extraido integer;
DECLARE v_dia_extraido integer;
DECLARE v_anio_actual integer;
DECLARE dias_mes integer[12]:= array[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
BEGIN
  if valor is null then
    return 0;
  end if;  
  v_anio_actual := extract (year from current_date)::integer;
  v_fechas_array := regexp_split_to_array(valor,'/');  
  v_anio_extraido := v_fechas_array[3];
  v_mes_extraido := v_fechas_array[2];
  v_dia_extraido := v_fechas_array[1];
  if v_anio_extraido is null then
    v_anio_extraido := v_anio_actual;
  end if;  
  if v_anio_extraido%4=0 then
    if v_anio_extraido%100=0 then
        if v_anio_extraido%400=0 then
            bisiesto = true;
        else
            bisiesto = false;
        end if;
    else
        bisiesto = true;
    end if;
  else
    bisiesto = false;
  end if;
  if v_anio_extraido is null or v_mes_extraido is null or v_dia_extraido is null then
    return 0;
  end if;
  if v_anio_extraido < 1890 or v_anio_extraido > v_anio_actual then
      return 0;
  end if;
  if v_mes_extraido <= 0 or v_mes_extraido > 12 or v_dia_extraido <=0 then
      return 0;
  end if;
  if v_mes_extraido <> 2 or bisiesto = false then
    if v_dia_extraido>dias_mes[v_mes_extraido] then
        return 0;
    end if;
  else
    if v_dia_extraido>dias_mes[2]+1 then
        return 0;
    end if;
  end if;
  return 1;  
EXCEPTION
  WHEN invalid_text_representation THEN
    return 0;
  WHEN invalid_datetime_format THEN
    return 0;
  WHEN datetime_field_overflow THEN
    return 0;     
END;
$BODY$;

--basada en sieh1 modificada
CREATE OR REPLACE FUNCTION comun.edad_a_la_fecha(
	p_f_nac date,
	p_fecha date)
    RETURNS integer
    LANGUAGE 'plpgsql'

AS $BODY$
DECLARE v_edad integer;
BEGIN
  if p_f_nac > p_fecha then 
    return null;
  end if;
  v_edad=extract(year from age(p_fecha,p_f_nac));
  if v_edad>130 or v_edad<0 then
    return null;
  end if;
  return v_edad;
EXCEPTION
  WHEN invalid_datetime_format THEN
    return null;
  WHEN datetime_field_overflow THEN
    return null;
END;
$BODY$;

