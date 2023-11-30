import express, { Request, Response, NextFunction } from 'express';
import { urlencoded ,json } from 'body-parser'

import todoRoutes from './routes/todos'

const app = express();

app.use(json());
app.use(urlencoded({ extended: true}));

app.use('/todos', todoRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction ) => {
    return res.status(200).json({
        message: error.message
    })
})

app.listen(3000, () => {
    console.log('server running at port 3000');
})