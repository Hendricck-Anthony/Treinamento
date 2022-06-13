import React from 'react'
import SimpleTable from './SimpleTable'
import PaginationTable from './PaginationTable'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
import UsersTable from './UsersTable'

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

const AppUsersTable = () => {
    return (
        <Container>
            <UsersTable />
        </Container>
    )
}

export default AppUsersTable
