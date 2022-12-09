import React, {useEffect, useState} from 'react'
import {
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    IconButton,
    Icon,
} from '@mui/material'
import { Breadcrumb } from 'app/components'
import SimpleCard from 'app/components/SimpleCard'
import { Box, styled } from '@mui/system'

import axios from '../../../../axios'
import 'dotenv/config'
import UserFormEdit from './UserFormEdit'

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

const StyledTable = styled(Table)(() => ({
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

    const [update,setUpdate]=useState(false)
    const [showUserFormEdit,setShowUserFormEdit]=useState(false)
    const [allusers, setAllUsers] = useState([])
    const [uid, setId] = useState()
    
    useEffect(async()=>{
        const response= await axios.get('/api/v1/users/searchall') 
        setAllUsers(response.data)
    },[props.update])
    
    return (

        <Container>
        <Box width="100%" overflow="auto">
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>NomeDeUsuario</TableCell>
                        <TableCell>E-mail</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {showUserFormEdit && <UserFormEdit 
                        open={showUserFormEdit}
                        close={()=>{setShowUserFormEdit(false)}}
                        onSubmit={()=>{setUpdate(!update)}}
                        uid={uid}
                    />}
                    {allusers?.map((users, index) => (
                        <TableRow key={index}>
                            
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
                            
                            <TableCell
                                title='Usuários'>
                                    <IconButton
                                    variant="outlined"
                                    color="primary"
                                    
                                    onClick={() => { 
                                        
                                        setId(users.usr_id);
                                        setShowUserFormEdit(true)
                                        } 
                                        }
                                    >
                                    <Icon color="primary">edit</Icon>
                                    </IconButton>
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
