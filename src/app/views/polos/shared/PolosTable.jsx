import React, {useEffect, useState} from 'react'
import {
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
} from '@mui/material'
import { Box, styled } from '@mui/system'

import axios from '../../../../axios'
import 'dotenv/config'


const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': {
            '& th': {
                paddingLeft: 0,
                paddingRight: 0,
            },
        },
    },
    '& tbody': {
        '& tr': {
            '& td': {
                paddingLeft: 0,
                textTransform: 'capitalize',
            },
        },
    },
    
}))




const PolosTable = () => {
    
    const [allusers, setAllUsers] = useState([])
    useEffect(async()=>{
        const response= await axios.get('/api/v1/polos/searchall')
        setAllUsers(response.data)
    },[])
    return (
            <StyledTable>
                <TableHead>
                    <TableRow>
                        {/* <TableCell width={"5%"}>ID</TableCell> */}
                        <TableCell>Nome</TableCell>
                        <TableCell>E-mail</TableCell>
                        <TableCell>Presencial</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allusers?.map((polos, index) => (
                        <TableRow key={index}>
                            {/* <TableCell align="left">
                                {users.usr_id}
                            </TableCell> */}
                            <TableCell align="left">
                                {polos.pol_name}
                            </TableCell>
                            <TableCell align="left">
                                {polos.pol_email}
                            </TableCell>
                            <TableCell align="left">
                                {polos.pol_is_presential}
                            </TableCell>
                            <TableCell align="left">
                                {polos.pol_status}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </StyledTable>


    )
}

export default PolosTable
