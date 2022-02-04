// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from '../../prisma-client/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  const body = JSON.parse(req.body);


  const new_post = await prisma.post.create({
    data: {
      picUrl: body.img,
      title: body.title,
      author: {connect: {id:body.author?.id}}
    },
  });



  if (new_post.id) {
    res.status(201).json({id:new_post.id});
  } else {
    res.status(409);
  }
}
