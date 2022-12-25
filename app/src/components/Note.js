import React from 'react'
import { useNote } from '../hooks/useNote'
import TableCell from '@mui/material/TableCell'
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'

function Note ({ nota }) {
  const { handleChangeImportant, important, disabled } = useNote(nota)

  return (
    nota.user
      ? (
        <>
          <TableCell>
            <Typography mt={2} variant='h6'>{nota.content}</Typography>
          </TableCell>
          {important
            ? <TableCell align='right'><Button color='inherit' variant='contained' disabled={disabled} onClick={handleChangeImportant}>Importante</Button></TableCell>
            : <TableCell align='right'><Button color='inherit' variant='contained' disabled={disabled} onClick={handleChangeImportant}>No importante</Button></TableCell>}
        </>
        )
      : 'Cargando...'
  )
}

export default React.memo(Note)
