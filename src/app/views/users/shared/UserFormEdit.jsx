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

export default function UserFormEdit(props) {
    const [open, setOpen] = React.useState(false)
    const [uid] = useState(props.uid)


    const [username, setUserName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [role, setRole] = useState('')
    const [email, setEmail] = useState('')

    const TextField = styled(TextValidator)(() => ({
        width: '100%',
        marginBottom: '16px',
    }))
        
    useEffect(() => {
        async function getUser(){
            
            var response = await axios.get('/api/v1/users/'+uid)
            setUserName(response.data.usr_username)
            setFirstName(response.data.usr_name)
            setRole(response.data.usr_role)
            setEmail(response.data.usr_email)
        }
        getUser();
    },[props.update])
    
    const [dialogState,setDialogState] = useState("formulario")
 
        const handleSubmit = async (event) => {
            const data =     
            {
                usr_name: firstName,
                usr_username: username,
                usr_email: email,
                usr_role: role
            }
            try {
                setDialogState("carregando")
                const response = await axios.put("/api/v1/users/"+uid,data)
                setDialogState("sucesso")
                props.onSubmit()
            } catch (error) {
                console.log("erro ao cadastrar usuario", error)
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
                >
                <DialogContent>

            <Grid container spacing={1}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextValidator
                        type="text"
                        id="username"
                        name="username"
                        onChange= {e => setUserName(e.target.value)}
                        value={username}
                        validators={[
                            'required',
                        ]}
                        fullWidth
                        label="Nome de Usuário"
                        errorMessages={['Este campo é obrigatório']}
                    />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} >
                    <TextValidator
                        type="text"
                        label="Nome"
                        onChange= {e => setFirstName(e.target.value)}
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        validators={['required']}
                        fullWidth
                        errorMessages={['Este campo é obrigatório']}
                    />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} >
                    <TextValidator
                        label="Email"
                        id='email'
                        onChange= {e => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        value={email || ''}
                        fullWidth
                        validators={['required', 'isEmail']}
                        errorMessages={[
                            'Este campo é obrigatório',
                            'E-mail não é válido',
                        ]}
                    />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} >
                    <TextValidator
                        label="Role"
                        id="role"
                        onChange= {e => setRole(e.target.value)}
                        type="text"
                        name="role"
                        fullWidth
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