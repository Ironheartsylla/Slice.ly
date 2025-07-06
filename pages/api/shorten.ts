import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'; // ✅ import types

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { url, slug: customSlug } = req.body;

    if (!url || !url.startsWith('http')) {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    const slug = customSlug || Math.random().toString(36).substring(2, 8);

    const existing = await prisma.link.findUnique({ where: { slug } });
    if (existing) {
      return res.status(409).json({ error: 'Slug already taken' });
    }

    const newLink = await prisma.link.create({
      data: { url, slug },
    });

    res.status(200).json({ shortUrl: `${process.env.BASE_URL}/${slug}` });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
