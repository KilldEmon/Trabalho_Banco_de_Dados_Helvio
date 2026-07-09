CREATE DATABASE IF NOT EXISTS classes_rpg;
USE classes_rpg;

-- Tabela 1: classes (5 campos: texto, número e data)
CREATE TABLE classes (
  id_classe INT NOT NULL AUTO_INCREMENT,
  nome_classe VARCHAR(50) NOT NULL,
  tipo_dano VARCHAR(50) NOT NULL,
  multiplicador_vida DECIMAL(4,2) NOT NULL,
  data_criacao DATE NOT NULL,
  PRIMARY KEY (id_classe)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela 2: herois (5 campos: texto, número e data)
CREATE TABLE herois (
  id_heroi INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  nivel_atual INT NOT NULL,
  data_desbloqueio DATE NOT NULL,
  id_classe_fk INT NOT NULL,
  PRIMARY KEY (id_heroi),
  -- Regra: Não deixa apagar uma classe se houver heróis nela (RESTRICT)
  CONSTRAINT fk_heroi_classe FOREIGN KEY (id_classe_fk) 
    REFERENCES classes (id_classe) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela 3: equipamentos (5 campos: texto, número e data)
CREATE TABLE equipamentos (
  id_equipamento INT NOT NULL AUTO_INCREMENT,
  nome_equipamento VARCHAR(100) NOT NULL,
  poder_ataque INT NOT NULL,
  data_forja DATE NOT NULL,
  id_heroi_fk INT DEFAULT NULL,
  PRIMARY KEY (id_equipamento),
  -- Regra: Se o herói for apagado, seus equipamentos também são (CASCADE)
  CONSTRAINT fk_equipamento_heroi FOREIGN KEY (id_heroi_fk) 
    REFERENCES herois (id_heroi) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;