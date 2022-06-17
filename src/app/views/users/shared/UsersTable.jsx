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




const UsersTable = () => {
    
    const [allusers, setAllUsers] = useState([])
    useEffect(async()=>{
        const response= await axios.get('/api/v1/users/searchall')
        setAllUsers(response.data)
        console.log(response.data)
    },[])
    return (
        <Container>
        <Box width="100%" overflow="auto">
            <StyledTable>
                <TableHead>
                    <TableRow>
                        {/* <TableCell width={"5%"}>ID</TableCell> */}
                        <TableCell>Nome</TableCell>
                        <TableCell>NomeDeUsuario</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allusers?.map((users, index) => (
                        <TableRow key={index}>
                            {/* <TableCell align="left">
                                {users.usr_id}
                            </TableCell> */}
                            <TableCell align="left">
                                {users.usr_name}
                            </TableCell>
                            <TableCell align="left">
                                {users.usr_username}
                            </TableCell>
                            <TableCell align="left">
                                {users.usr_email}
                            </TableCell>
                            <TableCell align="left">
                                {users.usr_role}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </StyledTable>
        </Box>
    </Container>

    )
}

export default UsersTable
