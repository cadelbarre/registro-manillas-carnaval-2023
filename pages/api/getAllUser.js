import prisma from '@/utils/prisma'

export default async function handler (req, res) {
  const user = await prisma.listado.findMany()
  res.json({ status: 'ok', data: user })
}
