import { NextApiRequest, NextApiResponse } from 'next';
import {MySQL} from 'src/datasource/mysql.datasource';

export default async function getVehicleById(req: NextApiRequest, res: NextApiResponse) {
  const sql = MySQL.getInstance();

  const response = await sql.query(`SELECT * FROM dessert`);

  res.json(response);
}
