import React, {useEffect, useState} from 'react'
import {
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    Icon,
    IconButton
} from '@mui/material'
import { Breadcrumb } from 'app/components'
import SimpleCard from 'app/components/SimpleCard'
import { Box, styled } from '@mui/system'

import axios from '../../../../axios'
import 'dotenv/config'
import RegistrationFormEdit from './RegistrationFormEdit'

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




const RegistrationTable = (props) => {
    
    const [showRegistrationFormEdit,setShowRegistrationFormEdit]=useState(false)
    const [allusers, setAllUsers] = useState([])
    const [update,setUpdate]=useState(false)
    const [rid, setId] = useState()
    
    useEffect(async()=>{
        const response= await axios.get('/api/v1/registration/searchall')
        setAllUsers(response.data)
    },[props.update])
    
    return (
        
        <Container>
        <Box className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: 'Usuarios', path: '/usuarios' }, { name: 'Matrículas' }]} />
        </Box>
        <Box width="100%" overflow="auto">
           <SimpleCard title='Matrículas'>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>Mês de início</TableCell>
                        <TableCell>E-mail</TableCell>
                        <TableCell>Nome do Aluno</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {showRegistrationFormEdit && <RegistrationFormEdit 
                        open={showRegistrationFormEdit}
                        close={()=>{setShowRegistrationFormEdit(false)}}
                        onSubmit={()=>{setUpdate(!update)}}
                        rid={rid}
                    />}
                    {allusers?.map((registration, index) => (
                        <TableRow key={index}>
                            <TableCell align="left">
                                {registration.mat_created_at}
                            </TableCell>
                            <TableCell align="left">
                                {registration.mat_email}
                            </TableCell>
                            <TableCell align="left">
                                {registration.mat_name}
                            </TableCell>
                            <TableCell align="left">
                                {registration.mat_status}
                            </TableCell>

                            <TableCell
                                title='Matriculas'>
                                    <IconButton
                                    variant="outlined"
                                    color="primary"
                                    
                                    onClick={() => { 
                                        
                                        setId(registration.mat_id);
                                        setShowRegistrationFormEdit(true)
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
            </SimpleCard>
        </Box>
    </Container>

    )
}

export default RegistrationTable
