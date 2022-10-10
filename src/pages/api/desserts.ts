import { NextApiRequest, NextApiResponse } from 'next';
import {MySQL} from 'src/datasource/mysql.datasource';

export default async function getVehicleById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sql = MySQL.getInstance();
  let response: Any = '';

  if(req.method === 'GET') {
    response = await sql.query(`SELECT * FROM dessert`);
  } else if(req.method === 'POST') {
    const {name, detail, price} = req.body;

    await sql.query(`
      INSERT INTO dessert(name, detail, price)
      VALUES ('${name}', '${detail}', ${price});`
    );

    response = {message: 'Se inserto correctamente'};
  }

  res.json(response);
}
