export const createMontadoraTable = `
  CREATE TABLE IF NOT EXISTS MONTADORA (
    ID_MONTADORA VARCHAR(50) PRIMARY KEY,
    NOME_MONTADORA VARCHAR(50) NOT NULL,
    PAIS VARCHAR(50) NOT NULL,
    ANO_FUNDACAO INT NOT NULL
  )
`;