import { NextApiRequest, NextApiResponse } from 'next';
import {MySQL} from 'src/datasource/mysql.datasource';

export default async function createRoom(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sql = MySQL.getInstance();
  let response: Any = '';

  if(req.method === 'POST') {
    const {roomName} = req.body;
    //const roomCode = `${randomChars(4)}-${randomChars(4)}-${randomChars(4)}`;
    const roomCode = 'xxx-yyy-zzz';
    await sql.query(`
      INSERT INTO SalaReunion(idAdministrador, nomSala, enlace)
      VALUES(1, '${roomName}', '${roomCode}')
    `);

    response = {roomCode};
  }

  res.json(response);
}



export const randomChars = (size = 10) => {
  const enableChars = 'qwertyuioplkjhgfdsazxcvbnmASDFGHJKLQWERTYUIOPMNBVCXZ';
  const length = enableChars.length;
  let result = '';

  for (let i = 0; i < size; i++) {
    const index = Math.floor(Math.random() * length);
    result += enableChars[index];
  }

  return result;
};
