import { GetServerSideProps } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;
  const link = await prisma.link.findUnique({ where: { slug } });

  if (link) {
    return {
      redirect: {
        destination: link.url,
        permanent: false,
      },
    };
  }

  return { notFound: true };
};

export default function Redirect() {
  return null;
}
