CREATE TABLE IF NOT EXISTS TBL_SKILL_SET
(
ID INT PRIMARY KEY AUTO_INCREMENT,
SKILL_SET VARCHAR(256) UNIQUE NOT NULL,
DESCRIPTION TEXT NOT NULL
);