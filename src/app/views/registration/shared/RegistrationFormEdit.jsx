import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import {
    Button,
    Grid,
} from '@mui/material'
import { styled } from '@mui/system'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import axios from '../../../../axios'
import { DatePicker } from '@mui/lab'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { H2 } from 'app/components/Typography'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'

export default function RegistrationFormEdit(props) {
    
    const [open, setOpen] = React.useState(false)
    const [rid] = useState(props.rid)

    const [morthStart, setMorthStart] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [status, setStatus] = useState('')

    const [matAddress, setMatAddress] = useState('')
    const [matComplement, setMatComplement] = useState('')
    const [matNumber, setMatNumber] = useState('')
    const [matCity, setMatCity] = useState('')
    const [matDistrict, setMatDistrict] = useState('')
    const [matCep, setMatCep] = useState('')
    const [matUf, setMatUf] = useState('') 
    const [dialogState,setDialogState]=useState("formulario")
    
    const [state, setState] = useState({
        monthStart: new Date(),
    })
    const handleDateChange = (monthStart) => {
        setState({ ...state, monthStart })
    }
    const {
        monthStart: monthStart
    } = state
   
    useEffect(() => {
        async function getUser(){
            
            var response = await axios.get('/api/v1/registration/'+rid)
            setMorthStart(response.data.mat_created_at)
            setEmail(response.data.mat_email)
            setName(response.data.mat_name)
            setStatus(response.data.mat_status)
            setMatCep(response.data.mat_postal_code)
            setMatAddress(response.data.mat_address)
            setMatCity(response.data.mat_city)
            setMatDistrict(response.data.mat_district)
            setMatUf(response.data.mat_uf)
            setMatNumber(response.data.mat_address_number)
            setMatComplement(response.data.mat_address_complement)
        }
        getUser();
    },[props.update])
    
    const searchCep = async (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        setMatCep(cep)
        
        if (cep.length === 8) {
        
            const response = await axios.get('https://viacep.com.br/ws/'+cep+'/json')
            const data = response.data
            setMatAddress(data.logradouro);
            setMatCity(data.localidade);
            setMatDistrict(data.bairro);
            setMatUf(data.uf);
        }
    };
    

    const handleSubmit = async (event) => {
        const data =     
        {
            mat_created_at:  monthStart,
            mat_email: email,
            mat_name: name,
            mat_status: status,
            mat_address: matAddress,
            mat_address_complement: matComplement,
            mat_address_number: matNumber,
            mat_city: matCity,
            mat_district: matDistrict,
            mat_postal_code: matCep,
            mat_uf: matUf
        }
        try {
            setDialogState("carregando")
            const response = await axios.put("/api/v1/registration/"+rid,data)
            setDialogState("sucesso")
            props.onSubmit()
        } catch (error) {
            console.log("erro ao efetuar matricula", error)
            setDialogState("erro")
        }
    }

    function handleClose() {
        setOpen(false)
    }
    
    switch (dialogState) {
        case "formulario":
            
            return(
                <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth="md"
                
            >
                 <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <H2
                            sx={{
                                flex: 1,
                                marginLeft:2,
                            }}
                        >
                            ATUALIZAR
                        </H2>
                    </Toolbar>
                </AppBar>
                <DialogTitle id="form-dialog-title">Dados Básicos</DialogTitle>
                <ValidatorForm
                    onSubmit={handleSubmit}
                    onError={() => null}
                    autoComplete="no"
                >
                <DialogContent>

            <Grid container spacing={1}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={monthStart}
                                fullWidth
                                onChange={handleDateChange}
                                renderInput={(props) => (
                                    <TextValidator
                                        {...props}
                                        id="mui-pickers-date"
                                        label="Date picker"
                                        sx={{ mb: 2, width: '100%' }}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} >
                    <TextValidator
                        label="Email"
                        onChange= {e => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        value={email}
                        validators={['required', 'isEmail']}
                        errorMessages={[
                            'Este campo é obrigatório',
                            'E-mail não é válido',
                        ]}
                        fullWidth
                    />
                
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} >

                    <TextValidator
                        label="Nome de Usúario"
                        onChange= {e => setName(e.target.value)}
                        name="name"
                        type="name"
                        value={name}
                        validators={['required']}
                        errorMessages={['Este campo é obrigatório']}
                        fullWidth
                    />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} >
                    <TextValidator
                        type="text"
                        name="status"
                        id="standard-basic"
                        onChange= {e => setStatus(e.target.value)}
                        value={status}
                        validators={[
                            'required',
                        ]}
                        label="Status"
                        errorMessages={['Este campo é obrigatório']}
                        fullWidth
                    />
                </Grid>
            </Grid>
        
                </DialogContent>
            <DialogTitle id="form-dialog-title">Endereço</DialogTitle>
            <DialogContent>
            <Grid container spacing={1} marginTop>
                <Grid item lg={2} md={6} sm={12} xs={12} >

                    <TextValidator
                        label="CEP"
                        onChange= {searchCep}
                        name="cep"
                        type="text"
                        value={matCep || ''}
                        validators={['required']}
                        errorMessages={['Este campo é obrigatório']}
                        fullWidth
                    />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} >

                    <TextValidator
                        label="Logradouro (Ex.: Rua...)"
                        onChange= {e => setMatAddress(e.target.value)}
                        name="address"
                        type="text"
                        value={matAddress || ''}
                        validators={['required']}
                        errorMessages={['Este campo é obrigatório']}
                        fullWidth
                    />
                </Grid>
                <Grid item lg={2.5} md={6} sm={12} xs={12} >

                    <TextValidator
                        label="Bairro"
                        onChange= {e => setMatDistrict(e.target.value)}
                        name="district"
                        type="text"
                        value={matDistrict || ''}
                        validators={['required']}
                        errorMessages={['Este campo é obrigatório']}
                        fullWidth
                    />
                </Grid>
                <Grid item lg={1.5} md={6} sm={12} xs={12} >

                    <TextValidator
                        label="Número"
                        onChange= {e => setMatNumber(e.target.value)}
                        name="number"
                        type="text"
                        value={matNumber || ''}
                        validators={['required']}
                        errorMessages={['Este campo é obrigatório']}
                        fullWidth
                    />
                </Grid>
                <Grid item lg={4} md={6} sm={12} xs={12} >

                    <TextValidator
                        label="Complemento"
                        onChange= {e => setMatComplement(e.target.value)}
                        name="complement"
                        type="text"
                        value={matComplement || ''}
                        validators={['required']}
                        errorMessages={['Este campo é obrigatório']}
                        fullWidth
                    />
                </Grid>
                <Grid item lg={4} md={6} sm={12} xs={12} >

                    <TextValidator
                        label="Estado"
                        onChange= {e => setMatUf(e.target.value)}
                        name="estate"
                        type="text"
                        value={matUf || ''}
                        validators={['required']}
                        errorMessages={['Este campo é obrigatório']}
                        fullWidth
                    />
                </Grid>
                <Grid item lg={4} md={6} sm={12} xs={12} >

                    <TextValidator
                        label="Cidade"
                        onChange= {e => setMatCity(e.target.value)}
                        name="city"
                        type="text"
                        value={matCity || ''}
                        validators={['required']}
                        errorMessages={['Este campo é obrigatório']}
                        fullWidth
                    />
                </Grid>
            </Grid>
            </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        onClick={props.close}
                    >
                    Cancelar
                    </Button>
                    <Button
                    style={{ width: 200 }}
                    variant="contained"
                    type="submit"
                    color="primary"
                    >
                    Atualizar
                    </Button>
                </DialogActions>
                </ValidatorForm>
            </Dialog>
            );
        case "carregando":
            return(
                <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth="md"
            >
                <DialogTitle id="form-dialog-title">Carregando</DialogTitle>
                </Dialog>
            );
        case "sucesso":
            return(
                <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth="md"
            >
                <DialogTitle id="form-dialog-title">Matricula realizada com sucesso.</DialogTitle>
                <DialogActions>
                    <Button
                        color="primary"
                        onClick={props.close}
                    >
                    FECHAR
                    </Button>
                </DialogActions>
                </Dialog>
            );
        
        case "erro":
            return(
                <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth="md"
            >
                <DialogTitle id="form-dialog-title">ERRO AO EFETUAR MATRICULA!</DialogTitle>
                <DialogActions>
                    <Button
                        color="primary"
                        onClick={props.close}
                    >
                    FECHAR!
                    </Button>
                </DialogActions>
                </Dialog>
                
            );
    
        default:
            break;
    }

}