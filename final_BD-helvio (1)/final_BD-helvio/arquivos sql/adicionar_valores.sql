USE classes_rpg;

-- Inserindo 5 Classes
INSERT INTO classes (nome_classe, tipo_dano, multiplicador_vida, data_criacao) VALUES
('Mago', 'Mágico', 1.20, '2026-01-10'),
('Guerreiro', 'Físico', 2.50, '2026-01-12'),
('Arqueiro', 'Físico', 1.50, '2026-01-15'),
('Tank', 'Físico', 3.00, '2026-02-20'),
('Necromancer', 'Mágico', 1.10, '2026-03-05');

-- Inserindo 5 Heróis
INSERT INTO herois (nome, nivel_atual, data_desbloqueio, id_classe_fk) VALUES
('Gustavo', 12, '2026-07-01', 1),
('teste2', 19, '2026-07-02', 2),
('Ghabriel', 8, '2026-07-03', 1),
('Rubens', 25, '2026-07-04', 3),
('Giovani', 30, '2026-07-05', 4);

-- Inserindo 5 Equipamentos
INSERT INTO equipamentos (nome_equipamento, poder_ataque, data_forja, id_heroi_fk) VALUES
('Cajado', 150, '2026-07-06', 1),
('Livro de Magias', 80, '2026-07-06', 3),
('Espada Longa', 200, '2026-07-06', 2),
('Arco Élfico', 180, '2026-07-06', 4),
('Escudo', 50, '2026-07-06', 5);