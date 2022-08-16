import React, { Fragment } from 'react'
import { Button, Grid } from '@mui/material'
import { styled, useTheme, Box } from '@mui/system'
import PolosTable from './shared/PolosTable'
import TableHead from '@mui/material'
import { Breadcrumb } from 'app/components'
import SimpleCard from 'app/components/SimpleCard'
import { useState } from 'react'

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

const PolosPage = () => {
    const [showPoleForm,setShowPoleForm] = useState(false)
    const { palette } = useTheme()

    return (
        <Fragment>
            <ContentBox className="analytics">
                <Grid container spacing={3}>
                <Container>
                    <Box className="breadcrumb">
                    <Breadcrumb routeSegments={[{ name: 'Usuários', path: '/usuarios' }, { name: 'Polos' }]} />
                     </Box>
                    <Box width="100%" overflow="auto">
                    <SimpleCard 
                    title="Polos"
                    button={<Button
                        variant="outlined"
                        color="primary"
                        onClick={()=> {setShowPoleForm(true)}}
                        >
                        Cadastrar
                        </Button>}
                    >
                        <PolosTable />
                        </SimpleCard>
                     </Box>
                </Container>
                    
                </Grid>
            </ContentBox>
        </Fragment>
    )
}

export default PolosPage
