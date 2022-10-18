import React, {useEffect, useState} from 'react'
import {
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    IconButton,
    Icon
} from '@mui/material'
import { Breadcrumb } from 'app/components'
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




const UsersTable = (props) => {
   
    const [allusers, setAllUsers] = useState([])
   
    useEffect(async()=>{
        const response= await axios.get('/api/v1/users/searchall')
        setAllUsers(response.data)
    }
    ,[props.update])


    return (

        
        <Container>
        <Box className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: 'Usuarios', path: '/usuarios' }, { name: 'Usuários' }]} />
        </Box>
        <Box width="100%" overflow="auto">
           <SimpleCard title='Usuários'>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        {/* <TableCell width={"5%"}>ID</TableCell> */}
                        <TableCell>Nome</TableCell>
                        <TableCell>NomeDeUsuario</TableCell>
                        <TableCell>E-mail</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell></TableCell>
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
                            <TableCell>
                                <IconButton onClick={()=>{props.teste(users.usr_id)}}><Icon color="primary">edit</Icon>
                                </IconButton>
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




export default UsersTable
