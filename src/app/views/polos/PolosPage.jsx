import React, { Fragment, useState } from 'react'
import { Button, Grid } from '@mui/material'
import { Box, styled, useTheme } from '@mui/system'
import PolosTable from './shared/PolosTable'
import SimpleCard from 'app/components/SimpleCard'
import PolosForm from './shared/PolosForm'
import { Breadcrumb } from 'app/components'


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
    const [update,setUpdate]=useState(false)    
    const [showPoleForm,setShowPoleForm] = useState(false)
    const { palette } = useTheme()
    const [refesh,setRefesh]=useState("")

    return (
        <Fragment>
            <ContentBox className="analytics">
                <Grid container spacing={3}>
                {showPoleForm&& <PolosForm 
                        open={showPoleForm}
                        close={()=>{setShowPoleForm(false)}}
                        onSubmit={()=>{setUpdate(!update)}}
                    />}
                    <Container>
                        <Box className="breadcrumb">
                            <Breadcrumb routeSegments={[{ name: 'Polos', path: '/Polos'  }]} />
                        </Box>
                        <Box width="100%" overflow="auto">
                            <SimpleCard
                            button={<Button
                                variant="outlined"
                                color="primary"
                                onClick={()=> {setShowPoleForm(true)}}
                                >
                                Cadastrar
                                </Button>}
                            title='Polos'>
                             <PolosTable 
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

export default PolosPage
