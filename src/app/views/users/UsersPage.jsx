import React, { Fragment, useState } from 'react'
import { Button, Grid, IconButton, Icon } from '@mui/material'
import { Box, styled, useTheme } from '@mui/system'
import UsersTable from './shared/UsersTable'
import SimpleCard from 'app/components/SimpleCard'
import UserForm from './shared/UserForm'
import { Breadcrumb } from 'app/components'

const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
}))

const SubTitle = styled('span')(({ theme }) => ({
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
}))

const H4 = styled('h4')(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '16px',
    textTransform: 'capitalize',
    color: theme.palette.text.secondary,
}))

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

const UsersPage = () => {
    const [update,setUpdate]=useState(false)
    const [showUserForm,setShowUserForm]=useState(false)
    const { palette } = useTheme()
    const [refesh,setRefesh]=useState("")

    return (
        <Fragment>
            <ContentBox className="analytics">
                <Grid container spacing={3}>
                    {showUserForm && <UserForm 
                        open={showUserForm}
                        close={()=>{setShowUserForm(false)}}
                        onSubmit={()=>{setUpdate(!update)}}
                    />}
                    <Container>
                        <Box className="breadcrumb">
                            <Breadcrumb routeSegments={[{ name: 'Usuarios',path: '/usuarios' }]} />
                        </Box>
                        <Box width="100%" overflow="auto">
                            <SimpleCard 
                                    button={<Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={()=> {setShowUserForm(true)}}
                                    >
                                        Cadastrar
                                    </Button>}
                                title='Usuários'>
                                <UsersTable 
                                    update={update}
                                    refesh={(parametro) => {setRefesh(parametro)}}
                                />
                            </SimpleCard>
                        </Box>
                    </Container>
                </Grid>
            </ContentBox>
        </Fragment>
    )
}

export default UsersPage
