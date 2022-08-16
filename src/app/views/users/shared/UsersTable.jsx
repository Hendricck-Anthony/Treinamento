import React, {useEffect, useState} from 'react'
import {
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    Button
    
} from '@mui/material'
import { Breadcrumb } from 'app/components'
import SimpleCard from 'app/components/SimpleCard'
import { Box, styled } from '@mui/system'
import UserForm from './UserForm'

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




const UsersTable = (props) => {
   
    const [allusers, setAllUsers] = useState([])
   
    useEffect(async()=>{
        const response= await axios.get('/api/v1/users/searchall')
        setAllUsers(response.data)
    }
    ,[props.update])


    return (

        
            
            <StyledTable>
                <TableHead>
                    <TableRow>
                        {/* <TableCell width={"5%"}>ID</TableCell> */}
                        <TableCell>Nome</TableCell>
                        <TableCell>NomeDeUsuario</TableCell>
                        <TableCell>E-mail</TableCell>
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

    )
    
}




export default UsersTable
