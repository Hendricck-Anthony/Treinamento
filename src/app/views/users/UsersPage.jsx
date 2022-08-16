import React, { Fragment, useState } from 'react'
import { Button, Grid } from '@mui/material'
import { Box, styled, useTheme } from '@mui/system'
import UsersTable from './shared/UsersTable'
import SimpleCard from 'app/components/SimpleCard'
import UserForm from './shared/UserForm'


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

    return (
        <Fragment>
            <ContentBox className="analytics">
                <Grid container spacing={3}>
                <UserForm 
                    open={showUserForm}
                    close={()=>{setShowUserForm(false)}}
                    onSubmit={()=>{setUpdate(!update)}}
                >
                </UserForm>
                <Container>
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
