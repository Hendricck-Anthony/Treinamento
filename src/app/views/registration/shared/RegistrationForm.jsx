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

export default function RegistrationForm(props) {const [open, setOpen] = React.useState(false)

    const TextField = styled(TextValidator)(() => ({
        width: '100%',
        marginBottom: '16px',
    }))
        
        const [dialogState,setDialogState]=useState("formulario")
        const initialState = {
            monthStart:'',
            email:'',
            name:'',
            status:'',
        }
        const [state, setState] = useState({
            initialState,
            monthStart: new Date(),
        })
        const handleDateChange = (monthStart) => {
            setState({ ...state, monthStart })
        }
        const {
            monthStart: monthStart,
            email: email,
            name: name,
            status: status,
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
                const response = await axios.post("/api/v1/registration/createregistration",data)
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
                                        // variant="Outlined"
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
                        onChange={handleChange}
                        type="email"
                        name="email"
                        value={email || ''}
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
                        onChange={handleChange}
                        name="name"
                        type="name"
                        value={name || ''}
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
                        onChange={handleChange}
                        value={status || ''}
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