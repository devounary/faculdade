import { Request, Response, Router } from "express"
import { criarMontadora, deletarMontadora, Montadora, editarMontadora } from "../controllers/montadora.controller"
import { contarRegistros, listarRegistros, buscarRegistro } from "../controllers/petro.controller"
import path from 'path';
const router = Router();
import { z, ZodError } from 'zod';

const montadoraSchema = z.object({
    nome_montadora: z.string().refine((value) => isNaN(Number(value))),
    pais: z.string().refine((value) => isNaN(Number(value))),
    ano_fundacao: z.number() // Ensure this is defined as a number
});

export type montadoraSchema = z.infer<typeof montadoraSchema>;

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
        if (req.body.ano_fundacao && !Number.isNaN(Number(req.body.ano_fundacao))) {
            req.body.ano_fundacao = Number(req.body.ano_fundacao); // Convert to number
        }

        const infosMontadora = montadoraSchema.parse(req.body)
        const id = req.body.id_montadora;
        await editarMontadora(infosMontadora, id);
        res.redirect("/lista-montadoras");
    } catch (error) {
        if (error instanceof ZodError) {
            console.error('Validation failed:', error.errors);
            const itens = {
                "nome": "Montadoras",
                "campos": ["id_montadora", "nome_montadora", "pais", "ano_fundacao"],
                "tipos": ["primary", "string", "string", "number"]
            };
            res.render(path.join(__dirname, "..", "/views/editar"), {
                itens,
                errorMessage: "Erro de validação. Por favor, verifique os dados inseridos.",
                table: req.body
            });
        } else {
            console.error('Unexpected error:', error);
        }
    }
});

router.post("/criar-montadoras", async (req: Request, res: Response) => {
    try {
        // convertendo ano para number
        if (req.body.ano_fundacao && !Number.isNaN(Number(req.body.ano_fundacao))) {
            req.body.ano_fundacao = Number(req.body.ano_fundacao); // Convert to number
        }
        // validando os campos e gerando a montadora
        const value = req.body
        console.log(value)
        const parsedMontadora = montadoraSchema.parse(req.body);
        await criarMontadora(parsedMontadora);
        res.redirect("/lista-montadoras");
    } catch (error) {
        if (error instanceof ZodError) {
            console.error('Validation failed:', error.errors);
            const itens = {
                "nome": "Montadoras",
                "campos": ["nome_montadora", "pais", "ano_fundacao"],
                "tipos": ["string", "string", "number"]
            };
            res.render(path.join(__dirname, "..", "/views/criar"), {
                itens,
                errorMessage: "Erro de validação. Por favor, verifique os dados inseridos.",
                values: req.body // Pass the submitted values back to pre-fill the form
            });
        } else {
            console.error('Unexpected error:', error);
        }

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
