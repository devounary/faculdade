import { Request, Response, Router } from "express"
import { criarMontadora, deletarMontadora, Montadora, editarMontadora } from "../controllers/montadora.controller"
import { contarRegistros, listarRegistros, buscarRegistro } from "../controllers/petro.controller"
import path from 'path';
const router = Router();

router.get("/montadora", async (req: Request, res: Response) => {
    try {
        const total_montadoras = await contarRegistros('MONTADORA');
        res.render(path.join(__dirname, "..", "/views/gerenciamento"), {
            total: total_montadoras,
            item: "Montadoras"
        });
    } catch (error) {
        console.error("Erro ao carregar total de montadoras:", error);
        res.status(500).send("Erro ao carregar dados de montadoras.");
    }
});

router.get("/criar-montadoras", (req: Request, res: Response) => {
    try {
        const itens = {
            "nome": "Montadoras",
            "campos": ["nome_montadora", "pais", "ano_fundacao"],
            "tipos": ["string", "string", "number"]
        };
        res.render(path.join(__dirname, "..", "/views/criar"), { itens });
    } catch (error) {
        console.error("Erro ao carregar página de criação de montadoras:", error);
        res.status(500).send("Erro ao carregar a página.");
    }
});

router.get("/editar-montadoras/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const montadora: Montadora = await buscarRegistro(id, "MONTADORA", "montadora");

        const itens = {
            "nome": "Montadoras",
            "campos": ["id_montadora", "nome_montadora", "pais", "ano_fundacao"],
            "tipos": ["primary", "string", "string", "number"]
        };
        res.render(path.join(__dirname, "..", "/views/editar"), { itens, table: montadora });
    } catch (error) {
        console.error("Erro ao carregar montadora para edição:", error);
        res.status(500).send("Erro ao carregar montadora.");
    }
});

router.post("/editar-montadoras", async (req: Request, res: Response) => {
    try {
        const infosMontadora: Montadora = req.body;
        await editarMontadora(infosMontadora);
        res.redirect("/lista-montadoras");
    } catch (error) {
        console.error("Erro ao editar montadora:", error);
        res.status(500).send("Erro ao editar montadora.");
    }
});

router.post("/criar-montadoras", async (req: Request, res: Response) => {
    try {
        const montadora: Montadora = req.body;
        await criarMontadora(montadora);
        res.redirect("/lista-montadoras");
    } catch (error) {
        console.error("Erro ao criar montadora:", error);
        res.status(500).send("Erro ao criar montadora.");
    }
});

router.get("/lista-montadoras", async (req: Request, res: Response) => {
    try {
        const listaMontadoras = await listarRegistros('MONTADORA');
        const itens = {
            "tabela": "Montadoras",
            "nomes": ["ID", "Nome", "País", "Ano de Fundação"]
        };
        res.render(path.join(__dirname, "..", "/views/lista"), { itens, lista: listaMontadoras });
    } catch (error) {
        console.error("Erro ao listar montadoras:", error);
        res.status(500).send("Erro ao carregar a lista de montadoras.");
    }
});

router.post("/deletar-montadoras/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await deletarMontadora(id);
        res.redirect("/lista-montadoras");
    } catch (error) {
        console.error("Erro ao deletar montadora:", error);
        res.status(500).send("Erro ao deletar montadora.");
    }
});

export default router;
