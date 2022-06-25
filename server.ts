import express, { Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
import { connect } from 'mongoose';
import routes from "./src/server/routes";

const app: Application = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => res.send("Root of project"));

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on url localhost:${port}`);
});

const db = 'mongodb://localhost:27017/test';

connect(db);

routes({app});

