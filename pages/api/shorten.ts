import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';


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

    // Use BASE_URL from env, or fallback to request host
    const baseUrl =
      process.env.BASE_URL ||
      (req.headers['origin'] || `https://${req.headers['host']}`);

    return res.status(200).json({
      shortUrl: `${baseUrl}/${slug}`,
      link: newLink,
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
