import jwt from 'jsonwebtoken';
import { prisma } from '../../prisma-client/prisma';
import { parseCookies } from '../../utils/parseCookies';

export default async function handler(req, res) {
  const cookies = parseCookies(req);

  const token = req.cookies.token;

  if (token) {
    const { username } = jwt.decode(token);
    await prisma.user
      .findFirst({ where: { username: { equals: username } } })
      .then((v) => {
        res.json({ data: v });
      });
  }
}
