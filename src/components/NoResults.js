import { useState } from 'react'
import Table from 'react-bootstrap/Table'
import { Container } from 'react-bootstrap'


const NoResults = () => {

   return (
      <Container
         style={{
         backgroundColor: 'white',
         borderRadius: '8px'
      }}>
         <Table>
            <thead>
               <tr><th style={{color:'red', textAlign: 'center'}}>No results available</th></tr>
            </thead>
         </Table>
      </Container>
   )
}

export default NoResults
