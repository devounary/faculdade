import { ulid } from "ulid";
import * as db from "../../database/database";
import { montadoraSchema } from "../routes/montadora.routes";

type Montadora = {
  id_montadora: string,
  nome_montadora: string,
  pais: string,
  ano_fundacao: number
}

// criação montadora
async function criarMontadora(montadora: montadoraSchema) {


  const id = ulid();

  const query = {
    text: `INSERT INTO MONTADORA VALUES ($1, $2, $3, $4) RETURNING *`,
    values: [id, montadora.nome_montadora, montadora.pais, montadora.ano_fundacao],
  };

  try {
    const result = await db.default.query(query.text, query.values);
    return result.rows[0];
  } catch (error) {
    console.error("Erro ao criar montadora:", error);
    throw error;
  }
}

// deleção da montadora
const deletarMontadora = (id: string) => {
  const query = {
    text: `DELETE FROM MONTADORA WHERE ID_MONTADORA = $1`,
    values: [id],
  };

  try {
    const result = db.default.query(query.text, query.values);
    return result;
  } catch (error) {
    console.error("Erro ao deletar registro:", error);
    throw error;
  }
}

// edição da montadora
const editarMontadora = (montadora: montadoraSchema, id: string) => {

  const query = {
    text: "UPDATE montadora SET nome_montadora = $1, pais = $2, ano_fundacao = $3 WHERE id_montadora = $4",
    values: [montadora.nome_montadora, montadora.pais, montadora.ano_fundacao, id]
  }

  try {
    const result = db.default.query(query.text, query.values);
    return result;
  } catch (error) {
    console.error("Erro ao editar registro:", error);
    throw error;
  }

}


export { criarMontadora, deletarMontadora, Montadora, editarMontadora };
