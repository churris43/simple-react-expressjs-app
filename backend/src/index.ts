import express, { Request, Response } from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import type { Connection } from 'mysql2/promise';


dotenv.config();

const app = express();

let connection: Connection;


async function initConnection() {
  connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });
  console.log('-----------Connected to database');
}


app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;
const DB_PORT = Number(process.env.MYSQL_PORT) || 3306;

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.get('/application', async (req: Request, res: Response) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM application');
    res.json(rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

app.post('/application', async (req: Request, res: Response) => {
  try {
    const companyName = req.body.companyName;
    const ad = req.body.ad;
    const create_time = req.body.create_time;
    const [result] = await connection.execute(
      'INSERT INTO application (companyName, ad, create_time) VALUES (?, ?, ?)',
      [companyName, ad, create_time]
    );
    res.status(201).json({ message: 'Application created', result});
  } catch (error) {
    res.status(500).json({ message: 'Failed to create application:'});
  }
});

app.put('/application/:id', async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const companyName = req.body.companyName;
    const ad = req.body.ad;
    const create_time = req.body.create_time;
    const [result] = await connection.execute(
      'UPDATE application SET companyName = ?, ad = ?, create_time=? where id = ?',
      [companyName, ad, create_time, id]
    );
    res.status(201).json({ message: 'Application edited', result});
  } catch (error) {
    res.status(500).json({ message: 'Failed to edit application:'});
  }
});

app.get('/application/:id', async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const [rows] = await connection.execute(
      'SELECT * from application WHERE id = ?',
      [id]
    );
    const result = (rows as any[])[0];
    if (!result) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: 'Unable to fetch application #', error});
  }
})

app.delete('/application/:id', async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const [result] = await connection.execute(
      'DELETE from application WHERE id = ?',
      [id]
    );
    res.status(201).json({ message: 'Application DELETED', result});
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete application'});
  }
})


/**
 * CRITICAL FIX:
 * Bind to 0.0.0.0 so Nginx can reach the container
 */
app.listen(PORT, "0.0.0.0", () => {
  console.log(`API running on port ${PORT}`);
});

initConnection()
  .then(() => {
    app.listen(DB_PORT, () => {
      console.log(`Server running on port ${DB_PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  });