USE classes_rpg;

SELECT nome, nivel_atual 
FROM herois 
WHERE nivel_atual > ALL (
    SELECT h.nivel_atual 
    FROM herois h 
    INNER JOIN classes c ON h.id_classe_fk = c.id_classe 
    WHERE c.nome_classe = 'Mago'
);