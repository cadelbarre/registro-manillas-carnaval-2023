import prisma from '@/utils/prisma'

export default async function handler (req, res) {
  const { body } = req

  try {
    const user = await prisma.error.create({
      data: body
    })
    res.json({ status: 'ok', message: 'Usuario guardado', data: user })
  } catch (error) {
    res.status(400).json({ statud: 'fail', message: error })
  }
}
