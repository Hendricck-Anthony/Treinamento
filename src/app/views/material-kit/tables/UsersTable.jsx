import React from 'react'
import {
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
} from '@mui/material'
import { Box, styled } from '@mui/system'

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

const subscribarList = [
    {
        ID: '1',
        Nome: 'Hendricck Anthony',
        NomeDeUsuario: 'HendricckA',
        Email: 'Hendricck.lino@gmail.com',
        Role: 'ADMIN',
    },
    {
        ID: '2',
        Nome: 'Talles Wendrel',
        NomeDeUsuario: 'TallesW',
        Email: 'Talles.Wendrel@gmail.com',
        Role: 'ADMIN',
    },
    {
        ID: '3',
        Nome: 'Eric Willian',
        NomeDeUsuario: 'EricW',
        Email: 'Eric.Willian@gmail.com',
        Role: 'ADMIN',
    }
]

const UsersTable = () => {
    return (
        <Box width="100%" overflow="auto">
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell width={"5%"}>ID</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>NomeDeUsuario</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {subscribarList.map((subscriber, index) => (
                        <TableRow key={index}>
                            <TableCell align="left">
                                {subscriber.ID}
                            </TableCell>
                            <TableCell align="left">
                                {subscriber.Nome}
                            </TableCell>
                            <TableCell align="left">
                                {subscriber.NomeDeUsuario}
                            </TableCell>
                            <TableCell align="left">
                                {subscriber.Email}
                            </TableCell>
                            <TableCell align="left">
                                {subscriber.Role}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </StyledTable>
        </Box>
    )
}

export default UsersTable
