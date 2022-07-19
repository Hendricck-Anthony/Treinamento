import React, {useEffect, useState} from 'react'
import {
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
} from '@mui/material'
import SimpleCard from 'app/components/SimpleCard'
import { Box, styled } from '@mui/system'

import axios from '../../../../axios'
import 'dotenv/config'
const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

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




const RegistrationTable = () => {
    
    const [allusers, setAllUsers] = useState([])
    useEffect(async()=>{
        const response= await axios.get('/api/v1/registration/searchall')
        setAllUsers(response.data)
        console.log(response.data)
    },[])
    return (
        <Container>
        <Box width="100%" overflow="auto">
           <SimpleCard>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        {/* <TableCell width={"5%"}>ID</TableCell> */}
                        <TableCell>Status</TableCell>
                        <TableCell>Mês de início</TableCell>
                        <TableCell>Nome do Aluno</TableCell>
                        <TableCell>E-mail</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allusers?.map((registration, index) => (
                        <TableRow key={index}>
                            {/* <TableCell align="left">
                                {users.usr_id}
                            </TableCell> */}
                            <TableCell align="left">
                                {registration.mat_status}
                            </TableCell>
                            <TableCell align="left">
                                {registration.mat_created_at}
                            </TableCell>
                            <TableCell align="left">
                                {registration.mat_name}
                            </TableCell>
                            <TableCell align="left">
                                {registration.mat_email}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </StyledTable>
            </SimpleCard>
        </Box>
    </Container>

    )
}

export default RegistrationTable
