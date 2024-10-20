import { Pool, PoolClient } from "pg";
import { createMontadoraTable } from '../src/models/montadora.models';
import { createModeloVeiculoTable } from '../src/models/modelo.models';
import { createVeiculoTable } from '../src/models/veiculo.models';
import 'dotenv/config'

const config = {
  connectionString: process.env.CONNECTION_STRING,
}

class DatabaseClient {
  private pool: Pool;

  constructor() {
    this.pool = new Pool(config);
  }

  async criarTabelas() {
    let client: PoolClient | null = null;
    try {
      client = await this.pool.connect();
      await this.query("BEGIN");

      await this.query(createMontadoraTable);
      await this.query(createModeloVeiculoTable);
      await this.query(createVeiculoTable);

      await this.query("COMMIT");
      console.log("Tabelas criadas com sucesso!");
    } catch (error) {
      if (client) await client.query("ROLLBACK");
      console.error("Erro ao criar as tabelas:", error.message);
      throw error;
    } finally {
      if (client) client.release();
    }
  }

  on(event: "error", listener: (err: Error, client: PoolClient) => void) {
    this.pool.on(event, listener);
  }

  async query(text: string, params?: any[]) {
    return this.pool.query(text, params);
  }

  async getClient() {
    return this.pool.connect();
  }
}

export default new DatabaseClient();
