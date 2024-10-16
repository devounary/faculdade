import { ulid } from "ulid";
import * as db from "../../database/database";

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

const criarVeiculo = async (veiculo: Veiculo) => {
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


export { criarVeiculo, deletarVeiculo }