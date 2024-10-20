import { ulid } from "ulid";
import * as db from "../../database/database";
import { veiculoSchema } from "../routes/veiculo.routes";

type Veiculo = {
    id_veiculo: string,
    cor: string,
    ano_fabricacao: number,
    ano_modelo: number,
    valor: number,
    placa: string,
    vendido: boolean,
    id_modelo: string,
}

const criarVeiculo = async (veiculo: veiculoSchema) => {
    const id = ulid();

    const query = {
        text: `INSERT INTO VEICULO VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        values: [id, veiculo.cor, veiculo.ano_fabricacao, veiculo.ano_modelo, veiculo.valor, veiculo.placa, veiculo.vendido, veiculo.id_modelo],
    };

    try {
        const result = await db.default.query(query.text, query.values);
        console.log(`Novo veiculo criado com ID: ${id}`);
        return result.rows[0];
    } catch (error) {
        console.error("Erro ao criar veiculo:", error);
        throw error;
    }

}

const editarVeiculo = async (veiculo: veiculoSchema, id: string) => {
    const query = {
        text: "UPDATE veiculo SET cor = $1, ano_fabricacao = $2, ano_modelo = $3, valor = $4, placa = $5, vendido = $6, id_modelo = $7 WHERE id_veiculo = $8",
        values: [veiculo.cor, veiculo.ano_fabricacao, veiculo.ano_modelo, veiculo.valor, veiculo.placa, veiculo.vendido, veiculo.id_modelo, id]
    }

    try {
        const result = await db.default.query(query.text, query.values);
        return result;
    } catch (error) {
        console.error("Erro ao editar veiculo:", error);
        throw error;
    }
}

const deletarVeiculo = (id: string) => {
    const query = {
        text: `DELETE FROM VEICULO WHERE ID_VEICULO = $1`,
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


export { criarVeiculo, deletarVeiculo, Veiculo, editarVeiculo }