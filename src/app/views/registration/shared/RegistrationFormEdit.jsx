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

export default function RegistrationFormEdit(props) {
    
    const [open, setOpen] = React.useState(false)
    const [rid] = useState(props.rid)

    const [morthStart, setMorthStart] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [status, setStatus] = useState('')


    useEffect(() => {
        async function getUser(){
            
            var response = await axios.get('/api/v1/registration/'+rid)
            setMorthStart(response.data.mat_created_at)
            setEmail(response.data.mat_email)
            setName(response.data.mat_name)
            setStatus(response.data.mat_status)
        }
        getUser();
    },[props.update])
        
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
    
        const handleSubmit = async (event) => {
            const data =     
            {
                mat_created_at: monthStart,
                mat_email: email,
                mat_name: name,
                mat_status: status,
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
                <DialogTitle id="form-dialog-title">Cadastro</DialogTitle>
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