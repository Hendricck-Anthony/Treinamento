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
import PolosFormEdit from './PolosFormEdit'

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

const PolosTable = (props) => {
    
    const [update,setUpdate]=useState(false)
    const [showPoleFormEdit,setShowPoleFormEdit]=useState(false)
    const [allusers, setAllUsers] = useState([])
    const [pid, setId] = useState()


    useEffect(async()=>{
        const response= await axios.get('/api/v1/polos/searchall')
        setAllUsers(response.data)
    },[props.update])
    
    return (
        
        <Container>
        <Box width="100%" overflow="auto">
           <SimpleCard title='Polos'>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>E-mail</TableCell>
                        <TableCell>Presencial</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {showPoleFormEdit&& <PolosFormEdit 
                        open={showPoleFormEdit}
                        close={()=>{setShowPoleFormEdit(false)}}
                        onSubmit={()=>{setUpdate(!update)}}
                        pid={pid}
                    />}
                    {allusers?.map((polos, index) => (
                        <TableRow key={index}>
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

                            <TableCell
                                title='Polos'>
                                    <IconButton
                                    variant="outlined"
                                    color="primary"
                                    
                                    onClick={() => { 
                                        
                                        setId(polos.pol_id);
                                        setShowPoleFormEdit(true)
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

export default PolosTable
