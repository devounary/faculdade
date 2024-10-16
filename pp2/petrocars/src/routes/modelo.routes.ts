import { Request, Response, Router } from "express"
import { contarRegistros, listarRegistros, buscarRegistro } from "../controllers/petro.controller"
import path from 'path';
import { criarModelo, deletarModelo, Modelo, editarModelo } from "../controllers/modelo.controller";
const router = Router();

router.get("/modelo", async (req: Request, res: Response) => {
    try {
        const totalModelos = await contarRegistros("MODELO_VEICULO");
        res.render(path.join(__dirname, "..", "/views/gerenciamento"), {
            total: totalModelos,
            item: "Modelos"
        });
    } catch (error) {
        console.error("Erro ao obter total de modelos:", error);
        res.status(500).send("Erro ao carregar dados de modelos.");
    }
});

router.get("/criar-modelos", async (req: Request, res: Response) => {
    try {
        const itens = {
            "nome": "Modelo",
            "campos": ["nome_modelo", "id_montadora", "valor_referencia", "motorizacao", "turbo", "automatico"],
            "tipos": ["string", "list", "number", "boolean", "boolean", "boolean"]
        };

        const montadoras = await listarRegistros("montadora");

        res.render(path.join(__dirname, "..", "/views/criar"), { itens: itens, lista: montadoras });
    } catch (error) {
        console.error("Erro ao carregar a página de criação de modelos:", error);
        res.status(500).send("Erro ao carregar a página.");
    }
});

router.post("/criar-modelo", async (req: Request, res: Response) => {
    try {
        const modelo: Modelo = req.body;
        await criarModelo(modelo);
        res.redirect("/lista-modelos");
    } catch (error) {
        console.error("Erro ao criar modelo:", error);
        res.status(500).send("Erro ao criar o modelo.");
    }
});

router.get("/editar-modelos/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const modelo: Modelo = await buscarRegistro(id, "MODELO_VEICULO", "modelo");
        const montadoras = await listarRegistros("montadora");

        const itens = {
            "nome": "Modelo",
            "campos": ["id_modelo", "nome_modelo", "id_montadora", "valor_referencia", "motorizacao", "turbo", "automatico"],
            "tipos": ["primary", "string", "list", "number", "boolean", "boolean", "boolean"]
        };
        res.render(path.join(__dirname, "..", "/views/editar"), { itens, lista: montadoras, table: modelo });
    } catch (error) {
        console.error("Erro ao carregar modelo para edição:", error);
        res.status(500).send("Erro ao carregar o modelo.");
    }
});

router.post("/editar-modelo", async (req, res) => {
    try {
        const infosModelo: Modelo = req.body;
        await editarModelo(infosModelo);
        res.redirect("/lista-modelos");
    } catch (error) {
        console.error("Erro ao editar modelo:", error);
        res.status(500).send("Erro ao editar o modelo.");
    }
});

router.get("/lista-modelos", async (req: Request, res: Response) => {
    try {
        const listaModelos = await listarRegistros("MODELO_VEICULO");

        const itens = {
            "tabela": "Modelos",
            "nomes": ["ID", "Nome", "Valor Referência", "Motorização", "Turbo", "Automatico", "ID Montadora"]
        };

        res.render(path.join(__dirname, "..", "/views/lista"), { itens: itens, lista: listaModelos });
    } catch (error) {
        console.error("Erro ao listar modelos:", error);
        res.status(500).send("Erro ao carregar a lista de modelos.");
    }
});

router.post("/deletar-modelos/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await deletarModelo(id);
        res.redirect("/lista-modelos");
    } catch (error) {
        console.error("Erro ao deletar modelo:", error);
        res.status(500).send("Erro ao deletar o modelo.");
    }
});

export default router;
