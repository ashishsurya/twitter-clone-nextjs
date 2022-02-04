import { prisma } from '../../../prisma-client/prisma';
import jwt from 'jsonwebtoken';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = JSON.parse(req.body);
    // console.log({ username, password });
    const user = await prisma.user
      .findFirst({
        where: { username: username },
      })
      .then((d) => d);

    if (!user) {
      res.json({
        data: {
          token: null,
          error: 'Invalid Credential ❌❌❌❌',
        },
      });
    } else {
      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET_KEY
      );

      res.json({
        data: {
          token: token,
          error: null,
        },
      });
    }
  }
}
