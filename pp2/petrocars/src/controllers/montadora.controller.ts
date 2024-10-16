import { ulid } from "ulid";
import * as db from "../../database/database";

type Montadora = {
  id_montadora: string,
  nome_montadora: string,
  pais: string,
  ano_fundacao: number
}


// criação montadora
async function criarMontadora(montadora: Montadora) {
  const id = ulid();

  const query = {
    text: `INSERT INTO MONTADORA VALUES ($1, $2, $3, $4) RETURNING *`,
    values: [id, montadora.nome_montadora, montadora.pais, montadora.ano_fundacao],
  };

  try {
    const result = await db.default.query(query.text, query.values);
    console.log(`Nova montadora criada com ID: ${id}`);
    return result.rows[0];
  } catch (error) {
    console.error("Erro ao criar montadora:", error);
    throw error;
  }
}

const deletarMontadora = (id: string) => {
  const query = {
    text: `DELETE FROM MONTADORA WHERE ID_MONTADORA = $1`,
    values: [id],
  };

  try {
    const result = db.default.query(query.text, query.values);
    console.log(`Registro deletado com sucesso!`);
    return result;
  } catch (error) {
    console.error("Erro ao deletar registro:", error);
    throw error;
  }
}

const editarMontadora = (montadora: Montadora) => {

  const query = {
    text: "UPDATE montadora SET nome_montadora = $1, pais = $2, ano_fundacao = $3 WHERE id_montadora = $4",
    values: [montadora.nome_montadora, montadora.pais, montadora.ano_fundacao, montadora.id_montadora]
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
