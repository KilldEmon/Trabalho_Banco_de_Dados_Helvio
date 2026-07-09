USE classes_rpg;

SELECT 
    c.nome_classe, 
    COUNT(h.id_heroi) AS total_herois, 
    AVG(h.nivel_atual) AS media_de_nivel
FROM classes c
INNER JOIN herois h ON c.id_classe = h.id_classe_fk
GROUP BY c.nome_classe
HAVING COUNT(h.id_heroi) > 0;