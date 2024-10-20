import * as db from "../../database/database";

const contarRegistros = async (table: string) => {
    const query = {
        text: `SELECT COUNT(*) FROM ${table}`,
    };

    try {
        const result = await db.default.query(query.text); // Espera a execução da query
        return result.rows[0].count; // Acessa o valor correto
    } catch (error) {
        console.error("Erro ao listar montadoras:", error);
        throw error;
    }
};

// listarMontadoras
async function listarRegistros(table: string) {
    const query = {
        text: `SELECT * FROM ${table}`,
    };

    try {
        const result = await db.default.query(query.text);
        return result.rows;
    } catch (error) {
        console.error("Erro ao listar montadoras:", error);
        throw error;
    }
}

const buscarRegistro = async (id: string, table: string, name_table: string) => {
    const query = {
        text: `SELECT * FROM ${table} WHERE id_${name_table} = $1`,
        values: [id],
    };

    try {
        const result = await db.default.query(query.text, query.values);
        return result.rows[0];
    } catch (error) {
        console.error("Erro ao buscar registro:", error);
        throw error;
    }
};

export { listarRegistros, contarRegistros, buscarRegistro };