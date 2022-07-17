import jwt from 'jsonwebtoken';
import { prisma } from '../../prisma-client/prisma';
import { parseCookies } from '../../utils/parseCookies';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const cookies = parseCookies(req);

    const token = req.cookies.token;

    if (token) {
      const { username } = jwt.decode(token);
      await prisma.user
        .findFirst({ where: { username: { equals: username } } })
        .then((v) => {
          res.json({ data: { username: v.username, id: v.id, name: v.name,imageUrl : v.imageUrl } });
        });
    } else {
      res.json({ message: 'No user currently logged in.' });
    }
  } else {
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
          const new_user = await prisma.user.create({
            data: {
              imageUrl: user.imageUrl,
              name: user.name,
              password: user.password,
              username: user.username,
            },
          }).then(nu => {
            res.json({message:`User created with id ${nu.id}`})
          })


        }
      });
  }
}
