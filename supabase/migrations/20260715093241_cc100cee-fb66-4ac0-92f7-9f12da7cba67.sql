UPDATE generated_casos
SET debt_amount = CASE
  WHEN category = 'Tarjetas revolving' THEN debt_amount || ' recuperados'
  WHEN category = 'ASNEF' THEN 'Fuera de ASNEF'
  WHEN category = 'Embargos' THEN 'Embargo levantado'
  ELSE debt_amount || ' cancelados'
END
WHERE status = 'published'
  AND debt_amount ~ '^[0-9\.]+\s*€$';