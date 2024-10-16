import { Request, Response, Router } from "express"
import { criarVeiculo, deletarVeiculo } from "../controllers/veiculo.controller"
import { contarRegistros, listarRegistros } from "../controllers/petro.controller"
import path from 'path';
const router = Router();

router.get("/veiculo", async (req: Request, res: Response) => {
    try {
        const totalVeiculos = await contarRegistros('VEICULO');
        res.render(path.join(__dirname, "..", "/views/gerenciamento"), {
            total: totalVeiculos,
            item: "Veiculos"
        });
    } catch (error) {
        console.error("Erro ao contar veículos:", error);
        res.status(500).send("Erro ao carregar dados de veículos.");
    }
});

router.get("/criar-veiculos", async (req: Request, res: Response) => {
    try {
        const itens = {
            "nome": "Veiculos",
            "campos": ["cor", "ano_fabricacao", "ano_modelo", "valor", "placa", "vendido", "id_modelo"],
            "tipos": ["string", "number", "number", "number", "string", "boolean", "list"]
        };

        const modelos = await listarRegistros("modelo_veiculo");
        res.render(path.join(__dirname, "..", "/views/criar"), { itens, lista: modelos });
    } catch (error) {
        console.error("Erro ao carregar página de criação de veículos:", error);
        res.status(500).send("Erro ao carregar a página.");
    }
});

router.post("/criar-veiculos", async (req: Request, res: Response) => {
    try {
        const veiculo = req.body;
        await criarVeiculo(veiculo);
        res.redirect("/lista-veiculos");
    } catch (error) {
        console.error("Erro ao criar veículo:", error);
        res.status(500).send("Erro ao criar veículo.");
    }
});

router.get("/lista-veiculos", async (req: Request, res: Response) => {
    try {
        const listaVeiculos = await listarRegistros('VEICULO');
        const itens = {
            "tabela": "Veiculos",
            "nomes": ["ID", "Cor", "Ano de Fabricação", "Ano do Modelo", "Valor", "Placa", "Vendido", "ID do Modelo"]
        };
        res.render(path.join(__dirname, "..", "/views/lista"), { itens, lista: listaVeiculos });
    } catch (error) {
        console.error("Erro ao listar veículos:", error);
        res.status(500).send("Erro ao carregar a lista de veículos.");
    }
});

router.post("/deletar-veiculos/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await deletarVeiculo(id);
        res.redirect("/lista-veiculos");
    } catch (error) {
        console.error("Erro ao deletar veículo:", error);
        res.status(500).send("Erro ao deletar veículo.");
    }
});

export default router;
