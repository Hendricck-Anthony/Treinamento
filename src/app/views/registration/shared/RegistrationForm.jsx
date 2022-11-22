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
import { get } from 'lodash'

export default function RegistrationForm(props) {const [open, setOpen] = React.useState(false)

    const [matAddress, setMatAddress] = useState('')
    const [matComplement, setMatComplement] = useState('')
    const [matNumber, setMatNumber] = useState('')
    const [matCity, setMatCity] = useState('')
    const [matDistrict, setMatDistrict] = useState('')
    const [matCep, setMatCep] = useState('')
    const [matUf, setMatUf] = useState('')
    const [registrationCreated, setRegistrationCreated] = useState({})

    const TextField = styled(TextValidator)(() => ({
        width: '100%',
        marginBottom: '16px',
    }))
        
        const [dialogState,setDialogState]=useState("formulario")
        const initialState = {
            monthStart:'',
            email:'',
            name:'',
            poloreg:'',
            cpf:'',
            birthdate:'',
            mobilephone:'',
            rg:'',
            org:'',
            gender:'',
            maritalstatus:'',
            phone:'',         
        }
        const [state, setState] = useState({
            initialState,
            monthStart: new Date(),
            birthdate: new Date(),
        })
        const handleDateChange = () => {
            setState({ ...state, monthStart })
            setState({ ...state, birthdate })

        }
        const {
            monthStart: monthStart,
            email: email,
            name: name,
            poloreg: poloreg,
            cpf: cpf,
            birthdate: birthdate,
            mobilephone: mobilephone,
            rg: rg,
            org: org,
            gender: gender,
            maritalstatus: maritalstatus,
            phone: phone
        } = state
    
        const handleSubmit = async (event) => {
            const data =     
            {
                mat_created_at: monthStart,
                mat_email: email,
                mat_name: name,
                mat_status: "PENDENTE ASSINATURA",
                mat_address: matAddress,
                mat_address_complement: matComplement,
                mat_address_number: matNumber,
                mat_city: matCity,
                mat_district: matDistrict,
                mat_postal_code: matCep,
                mat_uf: matUf,
                mat_pol_description: poloreg,
                mat_document_number: cpf,
                mat_birth_date: birthdate,
                mat_mobile_phone: mobilephone,
                mat_rg: rg,
                mat_issuing_agency: org,
                mat_gender: gender,
                mat_marital_status: maritalstatus,
                mat_home_phone: phone
            }
            try {
                setDialogState("carregando")
                const response = await axios.post("/api/v1/registration/createregistration",data)
                setRegistrationCreated(response.data)
                setDialogState("sucesso")
                props.onSubmit()
            } catch (error) {
                console.log("erro ao efetuar matricula", error)
                setDialogState("erro")
            }
        }
    
        const handleChange = (event) => {
            event.persist()
            setState({
                ...state,
                [event.target.name]: event.target.value,
            })
        }

    function handleClickOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

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
    



    
    switch (dialogState) {
        case "formulario":
            
            return(
                <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth="md"
                
            >
                <ValidatorForm
                    onSubmit={handleSubmit}
                    onError={() => null}
                    autoComplete="no"
                >
            <DialogTitle id="form-dialog-title">Dados Básicos</DialogTitle>
            <DialogContent>
            <Grid container spacing={1} marginTop>
                <Grid item lg={4} md={6} sm={12} xs={12} >
                    <TextValidator
                        label="Polo da Matrícula"
                        onChange= {handleChange}
                        name="poloreg"
                        type="text"
                        value={poloreg || ''}
                        errorMessages={['Este campo é obrigatório']}
                        fullWidth
                    />
                </Grid>
                <Grid item lg={3} md={6} sm={12} xs={12} >
                    <TextValidator
                        label="CPF"
                        onChange= {handleChange}
                        name="cpf"
                        type="text"
                        value={cpf|| ''}
                        errorMessages={['Este campo é obrigatório']}
                        fullWidth
                    />
                </Grid>
                <Grid item lg={2.5} md={6} sm={12} xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={birthdate || ''}
                                fullWidth
                                label="Data de Nascimento"
                                onChange={handleDateChange}
                                renderInput={(props) => (
                                    <TextValidator
                                        {...props}
                                        // variant="Outlined"
                                label="Data de Nascimento"
                                id="mui-pickers-date"
                                    />
                                )}
                            />
                        </LocalizationProvider>
                </Grid>
                <Grid item lg={2.5} md={6} sm={12} xs={12} >
                    <TextValidator
                        label="Celular Móvel"
                        onChange= {handleChange}
                        name="mobilephone"
                        type="text"
                        value={mobilephone || ''}
                        errorMessages={['Este campo é obrigatório']}
                        fullWidth
                    />
                </Grid>
                <Grid item lg={3} md={6} sm={12} xs={12} >
                    <TextValidator
                        label="RG"
                        onChange= {handleChange}
                        name="rg"
                        type="text"
                        value={rg || ''}
                        errorMessages={['Este campo é obrigatório']}
                        fullWidth
                    />
                </Grid>
                <Grid item lg={2} md={6} sm={12} xs={12} >
                    <TextValidator
                        label="Órgão emissor"
                        onChange= {handleChange}
                        name="org"
                        type="text"
                        value={org || ''}
                        errorMessages={['Este campo é obrigatório']}
                        fullWidth
                    />
                </Grid>
                <Grid item lg={2} md={6} sm={12} xs={12} >
                    <TextValidator
                        label="Sexo"
                        onChange= {handleChange}
                        name="gender"
                        type="text"
                        value={gender || ''}
                        errorMessages={['Este campo é obrigatório']}
                        fullWidth
                    />
                </Grid>
                <Grid item lg={2.5} md={6} sm={12} xs={12} >
                    <TextValidator
                        label="Estado Civil"
                        onChange= {handleChange}
                        name="maritalstatus"
                        type="text"
                        value={maritalstatus || ''}
                        errorMessages={['Este campo é obrigatório']}
                        fullWidth
                    />
                </Grid>
                <Grid item lg={2.5} md={6} sm={12} xs={12} >
                    <TextValidator
                        label="Telefone Fixo"
                        onChange= {handleChange}
                        name="phone"
                        type="text"
                        value={phone || ''}
                        errorMessages={['Este campo é obrigatório']}
                        fullWidth
                    />
                </Grid>        
                <Grid item lg={6} md={6} sm={12} xs={12} >
                    <TextValidator
                        label="Email"
                        onChange={handleChange}
                        type="email"
                        name="email"
                        value={email || ''}
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
                        onChange={handleChange}
                        name="name"
                        type="text"
                        value={name || ''}
                        errorMessages={['Este campo é obrigatório']}
                        fullWidth
                    />
                </Grid>
                {/* <Grid item lg={6} md={6} sm={12} xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={monthStart}
                                fullWidth
                                onChange={handleDateChange}
                                renderInput={(props) => (
                                    <TextValidator
                                        {...props}
                                        // variant="Outlined"
                                        id="mui-pickers-date"
                                        label="Data Cadastro"
                                        sx={{ mb: 2, width: '100%' }}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                </Grid> */}
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
                    Cadastrar
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
                <DialogTitle id="form-dialog-title">{registrationCreated?.mat_zapsign_signature_link}</DialogTitle>
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