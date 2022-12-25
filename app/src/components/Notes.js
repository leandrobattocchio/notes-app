
import React from 'react'
import Note from './Note'
import NoteForm from './NoteForm'
import { useSelector } from 'react-redux'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

function Notes () {
  const notes = useSelector(state => state.notes)

  return (
    <>
      <Typography color='white' align='center' variant='h2' pt={10}>APLICACION DE NOTAS</Typography>
      <TableContainer>
        <Table>
          <TableBody>
            {notes
              ? (
                  notes.map((nota, i) => {
                    return (
                      <TableRow key={i}>
                        <Note nota={nota} />
                      </TableRow>
                    )
                  })
                )
              : ('Cargando...')}
          </TableBody>
        </Table>
      </TableContainer>
      <NoteForm />
    </>
  )
}

export default React.memo(Notes)
