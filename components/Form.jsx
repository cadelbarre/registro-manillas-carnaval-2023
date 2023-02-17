import { useForm } from 'react-hook-form'
import swal from 'sweetalert'
import DatalistInput from 'react-datalist-input'

import cargos from '@/utils/cargos.json'
import clinicas from '@/utils/clinicas.json'
import { capitalize } from '@/utils/utils'

export default function Form () {
  const { register, handleSubmit, reset, setValue, getValues, watch, formState: { errors, isSubmitting } } = useForm()
  const onSubmit = async (data) => {
    const { otro, ...rest } = data

    if (otro?.length > 0) { rest.cargo = `Otro: ${capitalize(data.otro)}` }
    const body = {
      cargo: rest.cargo.trim(),
      nombre: rest.nombre.trim(),
      clinica: rest.clinica.trim()
    }

    try {
      const response = await fetch('/api/insert', {
        body: JSON.stringify(body),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      await response.json()
      swal('Excelente', 'Usuario guardado', 'success')
      reset({
        nombre: '',
        cargo: '',
        clinica: ''
      })
    } catch (error) {
      await fetch('/api/saveError', {
        body: JSON.stringify({ ...body, errorMessage: String(error) }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      swal('Error', 'Ha ocurrido un error. Comunicar con el admintrador', 'error')
    }
  }

  watch('cargo')

  return (
    <fieldset disabled={isSubmitting}>
      <form className='formulario' id='formulario' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='telefono'>Clinica</label>
        <div className='contenedor-input'>
          <svg width='18px' height='18px' strokeWidth='1.5' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' color='#1d4ed8'><path d='M6.4 8a.6.6 0 00.6-.6V3.6a.6.6 0 01.6-.6h8.8a.6.6 0 01.6.6v3.8a.6.6 0 00.6.6h1.8a.6.6 0 01.6.6v11.8a.6.6 0 01-.6.6H4.6a.6.6 0 01-.6-.6V8.6a.6.6 0 01.6-.6h1.8z' stroke='#1d4ed8' strokeWidth='1.5' /><path d='M9.992 8h2m2 0h-2m0 0V6m0 2v2M16 17.01l.01-.011M16 13.01l.01-.011M12 13.01l.01-.011M8 13.01l.01-.011M8 17.01l.01-.011M12 17.01l.01-.011' stroke='#1d4ed8' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' /></svg>
          <div style={{ marginBottom: '20px' }}>
            <DatalistInput
              placeholder='Clinica XYZ'
              onSelect={(item) => setValue('clinica', item.value)}
              {...register('clinica', {
                required: true
              })}
              items={clinicas}
            />
            {/* <input
              type='text' {...register('clinica', {
                required: true
              })} placeholder='Clinica xyz'
            /> */}
            {errors.clinica && <span className='msgError'>Este campo es requerido  .</span>}
          </div>
        </div>

        <label htmlFor='nombre'>Nombre</label>
        <div className='contenedor-input'>
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-person-circle' viewBox='0 0 16 16'>
            <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
            <path fillRule='evenodd' d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z' />
          </svg>
          <div style={{ marginBottom: '20px' }}>

            <input
              autoComplete='off'
              type='text' {...register('nombre', {
                required: true
              })} placeholder='Pete Michell'
            />
            {errors.nombre && <span className='msgError'>Este campo es requerido.</span>}
          </div>
        </div>

        <label htmlFor='correo'>Cargo</label>
        <div className='contenedor-input'>
          <svg width='18px' height='18px' strokeWidth='1.5' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' color='#1d4ed8'><path d='M2 20v-1a7 7 0 017-7v0' stroke='#1d4ed8' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' /><path d='M15.804 12.313a1.618 1.618 0 012.392 0v0c.325.357.79.55 1.272.527v0a1.618 1.618 0 011.692 1.692v0c-.023.481.17.947.526 1.272v0c.705.642.705 1.75 0 2.392v0c-.356.325-.549.79-.526 1.272v0a1.618 1.618 0 01-1.692 1.692v0a1.618 1.618 0 00-1.272.526v0a1.618 1.618 0 01-2.392 0v0a1.618 1.618 0 00-1.272-.526v0a1.618 1.618 0 01-1.692-1.692v0a1.618 1.618 0 00-.527-1.272v0a1.618 1.618 0 010-2.392v0c.357-.325.55-.79.527-1.272v0a1.618 1.618 0 011.692-1.692v0c.481.023.947-.17 1.272-.527v0z' stroke='#1d4ed8' strokeWidth='1.5' /><path d='M15.364 17l1.09 1.09 2.182-2.18M9 12a4 4 0 100-8 4 4 0 000 8z' stroke='#1d4ed8' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' /></svg>
          <div style={{ marginBottom: '20px' }}>
            <DatalistInput
              placeholder='Auxiliar'
              onSelect={(item) => setValue('cargo', item.value)}
              {...register('cargo', {
                required: true
              })}
              items={cargos}
            />
            {errors.cargo && <span className='msgError'>Este campo es requerido.</span>}
            {
                getValues('cargo') === 'Otro' && (
                  <>
                    <label htmlFor='cargo' style={{ marginTop: '20px' }}>¿Cual cargo?:</label>
                    <div className='contenedor-input'>
                      <svg width='18px' height='18px' strokeWidth='1.5' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' color='#1d4ed8'><path d='M2 20v-1a7 7 0 017-7v0' stroke='#1d4ed8' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' /><path d='M15.804 12.313a1.618 1.618 0 012.392 0v0c.325.357.79.55 1.272.527v0a1.618 1.618 0 011.692 1.692v0c-.023.481.17.947.526 1.272v0c.705.642.705 1.75 0 2.392v0c-.356.325-.549.79-.526 1.272v0a1.618 1.618 0 01-1.692 1.692v0a1.618 1.618 0 00-1.272.526v0a1.618 1.618 0 01-2.392 0v0a1.618 1.618 0 00-1.272-.526v0a1.618 1.618 0 01-1.692-1.692v0a1.618 1.618 0 00-.527-1.272v0a1.618 1.618 0 010-2.392v0c.357-.325.55-.79.527-1.272v0a1.618 1.618 0 011.692-1.692v0c.481.023.947-.17 1.272-.527v0z' stroke='#1d4ed8' strokeWidth='1.5' /><path d='M15.364 17l1.09 1.09 2.182-2.18M9 12a4 4 0 100-8 4 4 0 000 8z' stroke='#1d4ed8' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' /></svg>
                      <input
                        autoComplete='off'
                        type='text' placeholder=''
                        id='cargo'
                        name='otro'
                        {...register('otro', {
                          required: true
                        })}
                      />
                      {errors.otro && <span className='msgError'>Este campo es requerido.</span>}
                    </div>
                  </>

                )
            }

          </div>
        </div>

        <div className='contenedor-boton'>
          <button type='submit'>
            {isSubmitting ? 'Guardando...' : 'Registrame'}
            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-check' viewBox='0 0 16 16'>
              <path d='M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z' />
            </svg>
          </button>
        </div>
      </form>
    </fieldset>
  )
}
