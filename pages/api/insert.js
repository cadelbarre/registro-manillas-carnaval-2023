import prisma from '@/utils/prisma'
import { capitalize } from '@/utils/utils'

export default async function handler (req, res) {
  const { body } = req

  const data = {
    nombre: capitalize(body.nombre),
    clinica: body.clinica,
    cargo: body.cargo
  }

  try {
    const user = await prisma.listado.create({
      data
    })
    res.json({ status: 'ok', message: 'Usuario guardado', data: user })
  } catch (error) {
    res.status(400).json({ statud: 'fail', message: error })
  }
}
