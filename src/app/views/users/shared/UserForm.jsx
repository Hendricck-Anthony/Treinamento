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
import axios from 'axios'

export default function UserForm(props) {
    const [open, setOpen] = React.useState(false)

    const TextField = styled(TextValidator)(() => ({
        width: '100%',
        marginBottom: '16px',
    }))
        
        const [dialogState,setDialogState]=useState("formulario")

        const initialState = {
            username:'',
            firstName:'',
            password:'',
            confirmPassword:'',
            email:'',
            role:''
        }
        const [state, setState] = useState(initialState)
        const {
            username,
            firstName,
            role,
            password,
            confirmPassword,
            email,
        } = state

        useEffect(() => {
            ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
    
                if (value !== state.password) {
                    return false
                }
                return true
            })
            return () => ValidatorForm.removeValidationRule('isPasswordMatch')
        }, [state.password])
    
        const handleSubmit = async (event) => {
            const data =     
            {
                usr_name: firstName,
                usr_username: username,
                usr_password: password,
                usr_email: email,
                usr_role: role
            }
            try {
                setDialogState("carregando")
                const response = await axios.post("http://localhost:3001/api/v1/users/createuser",data)
                setDialogState("sucesso")
                props.onSubmit()
            } catch (error) {
                console.log("erro ao cadastrar usuario", error)
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

    

        // const username={
        //     name:"hendricck"
        // }
        // const{name}=username

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
                <Grid item lg={6} md={6} sm={12} xs={12} >
                    <TextField
                        type="text"
                        name="username"
                        id="standard-basic"
                        onChange={handleChange}
                        value={username || ''}
                        validators={[
                            'required',
                        ]}
                        label="Nome de Usuário"
                        errorMessages={['Este campo é obrigatório']}
                    />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} >
                    <TextField
                        label="Nome"
                        onChange={handleChange}
                        type="text"
                        name="firstName"
                        value={firstName || ''}
                        validators={['required']}
                        errorMessages={['Este campo é obrigatório']}
                    />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} >
                    <TextField
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
                    />
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12} >

                    <TextField
                        label="Senha"
                        onChange={handleChange}
                        name="password"
                        type="password"
                        value={password || ''}
                        validators={['required']}
                        errorMessages={['Este campo é obrigatório']}
                    />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} >
                    <TextField
                        label="Confirme a Senha"
                        onChange={handleChange}
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword || ''}
                        validators={['required', 'isPasswordMatch']}
                        errorMessages={[
                            'Este campo é obrigatório',
                            "a senha não corresponde",
                        ]}
                    />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} >
                    <TextField
                        label="Role"
                        onChange={handleChange}
                        type="text"
                        name="role"
                        value={role || ''}
                        validators={['required']}
                        errorMessages={['Este campo é obrigatório']}
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
                <DialogTitle id="form-dialog-title">Usuário cadastrado com sucesso.</DialogTitle>
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
                <DialogTitle id="form-dialog-title">ERRO AO CADASTRAR USUARIO!</DialogTitle>
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
