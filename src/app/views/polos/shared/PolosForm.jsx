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





export default function PolosForm(props) {const [open, setOpen] = React.useState(false)

    const TextField = styled(TextValidator)(() => ({
        width: '100%',
        marginBottom: '16px',
    }))
        
        const [dialogState,setDialogState]=useState("formulario")

        const initialState = {
            namepole:'',
            emailpol:'',
            presentialpol:'',
            statuspol:'',
        }
        const [state, setState] = useState(initialState)
        const {
            namepole,
            emailpol,
            presentialpol,
            statuspol,
        } = state
    
        const handleSubmit = async (event) => {
            const data =     
            {
                pol_name: namepole,
                pol_email: emailpol,
                pol_is_presential: presentialpol,
                pol_status: statuspol,
            }
            try {
                setDialogState("carregando")
                const response = await axios.post("/api/v1/polos/createpolos",data)
                setDialogState("sucesso")
                props.onSubmit()
            } catch (error) {
                console.log("erro ao efetuar cadastro", error)
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
                    <TextValidator
                        type="text"
                        name="namepole"
                        id="standard-basic"
                        onChange={handleChange}
                        value={namepole || ''}
                        validators={[
                            'required',
                        ]}
                        label="Nome do polo"
                        errorMessages={['Este campo é obrigatório']}
                        fullWidth
                    />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextValidator
                        type="text"
                        name="emailpol"
                        id="standard-basic"
                        onChange={handleChange}
                        value={emailpol || ''}
                        validators={[
                            'required',
                        ]}
                        label="Email do polo"
                        errorMessages={['Este campo é obrigatório']}
                        fullWidth
                    />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextValidator
                        type="text"
                        name="presentialpol"
                        id="standard-basic"
                        onChange={handleChange}
                        value={presentialpol || ''}
                        validators={[
                            'required',
                        ]}
                        label="Presencial"
                        errorMessages={['Este campo é obrigatório']}
                        fullWidth
                    />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextValidator
                        type="text"
                        name="statuspol"
                        id="standard-basic"
                        onChange={handleChange}
                        value={statuspol || ''}
                        validators={[
                            'required',
                        ]}
                        label="Status Polo"
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
                <DialogTitle id="form-dialog-title">Cadastro realiza com sucesso.</DialogTitle>
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
                <DialogTitle id="form-dialog-title">ERRO AO EFETUAR CADASTRO</DialogTitle>
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
    
        default:
            break;
    }

}