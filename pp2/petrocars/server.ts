import express, { Request, Response } from 'express';
import montadoraRouter from "./src/routes/montadora.routes"
import modeloRouter from "./src/routes/modelo.routes"
import veiculoRouter from "./src/routes/veiculo.routes"
import path from 'path';

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(montadoraRouter, modeloRouter, veiculoRouter);

const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.render(path.join(__dirname, 'src', 'views', 'index'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
