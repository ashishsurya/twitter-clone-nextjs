import jwt from 'jsonwebtoken';
import { prisma } from '../../../prisma-client/prisma';
import { parseCookies } from '../../../utils/parseCookies';

export default async function handler(req, res) {
  // parsing the body (data sent)
  const user = JSON.parse(req.body);

  // the type of data coming from the request.
  // const user = {
  //   name
  //   username
  //   imageUrl
  //   password
  // }

  // checking if there is any user with the same username.
  await prisma.user
    .findFirst({
      where: { username: { equals: user.username } },
    })
    .then(async (data) => {
      if (data) {
        res.json({ error: 'Username already taken.' });
      } else {
        const new_user = await prisma.user
          .create({
            data: {
              imageUrl: user.imageUrl,
              name: user.name,
              password: user.password,
              username: user.username,
            },
          })
          .then((nu) => {
            const token = jwt.sign(
              { username: nu.username },
              process.env.JWT_SECRET_KEY
            );
            res.json({token})
          });
      }
    });
}
