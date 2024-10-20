import { ulid } from "ulid";
import * as db from "../../database/database";
import { modeloSchema } from "../routes/modelo.routes";

type Modelo = {
    id_modelo: string,
    nome_modelo: string,
    montador_id: number,
    valor_referencia: number,
    motorizacao: boolean,
    turbo: boolean,
    automatico: boolean,
    id_montadora: number
}

// criação montadora
async function criarModelo(modelo: modeloSchema) {
    const id = ulid();

    const query = {
        text: `INSERT INTO MODELO_VEICULO VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        values: [id, modelo.nome_modelo, modelo.valor_referencia, modelo.motorizacao, modelo.turbo, modelo.automatico, modelo.id_montadora],
    };

    try {
        const result = await db.default.query(query.text, query.values);
        return result.rows[0];
    } catch (error) {
        console.error("Erro ao criar montadora:", error);
        throw error;
    }
}


const deletarModelo = (id: string) => {
    const query = {
        text: `DELETE FROM MODELO_VEICULO WHERE ID_MODELO = $1`,
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

const editarModelo = async (modelo: modeloSchema, id: string) => {

    // const modeloAtual: Modelo = await buscarModelo(id);
    const query = {
        text: "UPDATE modelo_veiculo SET nome_modelo = $1, valor_referencia = $2, motorizacao = $3, turbo = $4, automatico = $5, id_montadora = $6 WHERE id_modelo = $7",
        values: [modelo.nome_modelo, modelo.valor_referencia, modelo.motorizacao, modelo.turbo, modelo.automatico, modelo.id_montadora, id]
    }

    try {
        const result = db.default.query(query.text, query.values);
        return result;
    } catch (error) {
        console.error("Erro ao editar registro:", error);
        throw error;
    }
}

export { criarModelo, deletarModelo, Modelo, editarModelo }