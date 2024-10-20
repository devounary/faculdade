import { Request, Response, Router } from "express"
import { criarVeiculo, editarVeiculo, deletarVeiculo, Veiculo } from "../controllers/veiculo.controller"
import { buscarRegistro, contarRegistros, listarRegistros } from "../controllers/petro.controller"
import path from 'path';
import { z, ZodError } from "zod";

const router = Router();

const veiculoSchema = z.object({
    cor: z.string().min(1).refine((value) => isNaN(Number(value))),
    ano_fabricacao: z.number(),
    ano_modelo: z.number(),
    valor: z.number(),
    placa: z.string(),
    vendido: z.boolean(),
    id_modelo: z.string()
})

export type veiculoSchema = z.infer<typeof veiculoSchema>;

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
    const modelos = await listarRegistros("modelo_veiculo");
    try {
        const veiculoData = {
            ...req.body,
            cor: req.body.cor,
            ano_fabricacao: parseInt(req.body.ano_fabricacao),
            ano_modelo: parseInt(req.body.ano_modelo),
            valor: parseFloat(req.body.valor),
            vendido: req.body.vendido === 'true',
            id_modelo: String(req.body.id_modelo)
        };

        const veiculo = veiculoSchema.parse(veiculoData);

        await criarVeiculo(veiculo);
        res.redirect("/lista-veiculos");
    } catch (error) {
        if (error instanceof ZodError) {

            console.error('Validation failed:', error.errors);

            const itens = {
                "nome": "Veiculos",
                "campos": ["cor", "ano_fabricacao", "ano_modelo", "valor", "placa", "vendido", "id_modelo"],
                "tipos": ["string", "number", "number", "number", "string", "boolean", "list"]
            };

            res.render(path.join(__dirname, "..", "/views/criar"), {
                itens,
                errorMessage: "Erro de validação. Por favor, verifique os dados inseridos.",
                lista: modelos,
                table: req.body
            });
        } else {
            console.error('Unexpected error:', error);
        }
    }
});

router.get("/editar-veiculos/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const veiculo: Veiculo = await buscarRegistro(id, "VEICULO", "veiculo");

        const modelos = await listarRegistros("modelo_veiculo");

        const itens = {
            "nome": "Veiculo",
            "campos": ["id_veiculo", "cor", "ano_fabricacao", "ano_modelo", "valor", "placa", "vendido", "id_modelo"],
            "tipos": ["primary", "string", "number", "number", "number", "string", "boolean", "list"]
        };
        res.render(path.join(__dirname, "..", "/views/editar"), { itens, lista: modelos, table: veiculo });
    } catch (error) {
        console.error("Erro ao carregar modelo para edição:", error);
        res.status(500).send("Erro ao carregar o modelo.");
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


router.post("/editar-veiculo", async (req, res) => {
    try {
        const id = req.body.id_veiculo;

        const veiculoData = {
            ...req.body,
            cor: req.body.cor,
            ano_fabricacao: parseInt(req.body.ano_fabricacao),
            ano_modelo: parseInt(req.body.ano_modelo),
            valor: parseFloat(req.body.valor),
            vendido: req.body.vendido === 'true',
            id_modelo: String(req.body.id_modelo)
        };

        const veiculo = veiculoSchema.parse(veiculoData);
        await editarVeiculo(veiculo, id);
        res.redirect("/lista-veiculos");
    } catch (error) {
        if (error instanceof ZodError) {

            const modelos = await listarRegistros("modelo_veiculo");

            const veiculo: Veiculo = req.body;

            console.error('Validation failed:', error.errors);
            const itens = {
                "nome": "Veiculo",
                "campos": ["id_veiculo", "cor", "ano_fabricacao", "ano_modelo", "valor", "placa", "vendido", "id_modelo"],
                "tipos": ["primary", "string", "number", "number", "number", "string", "boolean", "list"]
            };
            res.render(path.join(__dirname, "..", "/views/editar"), {
                itens,
                errorMessage: "Erro de validação. Por favor, verifique os dados inseridos.",
                lista: modelos,
                table: veiculo
            });
        } else {
            console.error('Unexpected error:', error);
        }
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
