USE classes_rpg;

SELECT nome_classe 
FROM classes c
WHERE EXISTS (
    SELECT 1 
    FROM herois h 
    WHERE h.id_classe_fk = c.id_classe
);