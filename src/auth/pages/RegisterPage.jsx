import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link as RouterLink } from 'react-router-dom'

import { Grid, Typography, TextField, Button, Link, Alert } from "@mui/material"

import AuthLayout from "../layout/AuthLayout"
import { useForm } from "../../hooks/useForm"
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks"

const formData = {
    email: '',
    password: '',
    displayName: ''
}

const formValidations = {
    email: [ (value) => value.includes('@'), 'Email should be valid'],
    password: [ (value) => value.length >= 6, 'Password should be more than 6 characters'],
    displayName: [ (value) => value.length >= 1, 'Name is required']
}

const RegisterPage = () => {

    const dispatch = useDispatch();
    const [formSubmitted, setFormSubmitted] = useState(false)
    
    const { status, errorMessage } = useSelector( state => state.auth)
    const isCheckingAuthentication = useMemo( () => status === 'checking', [status])

    const { formState, displayName, email, password, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm(formData, formValidations)

    const onSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true)

        if (!isFormValid) {
            return
        }
        
        dispatch(startCreatingUserWithEmailPassword(formState))
    }

    return (
        <AuthLayout title="Register">

            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Name"
                            type="text"
                            placeholder="John"
                            fullWidth
                            name='displayName'
                            value={displayName}
                            onChange={onInputChange}
                            error={ !!displayNameValid && formSubmitted }
                            helperText={ !!displayNameValid && formSubmitted ? displayNameValid : null } />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Email"
                            type="email"
                            placeholder="correo@google.com"
                            fullWidth
                            name='email'
                            value={email}
                            onChange={onInputChange}
                            error={ !!emailValid && formSubmitted }
                            helperText={ !!emailValid && formSubmitted ? emailValid : null } />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Password"
                            type="password"
                            placeholder="Password"
                            fullWidth
                            name='password'
                            value={password}
                            onChange={onInputChange}
                            error={ !!passwordValid && formSubmitted }
                            helperText={ !!passwordValid && formSubmitted ? passwordValid : null } />
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mt: 2 }}>

                    <Grid
                        item
                        xs={12}
                        display={ !!errorMessage ? '' : 'none' }>
                        
                        <Alert severity="error">
                            { errorMessage }
                        </Alert>
                    </Grid>

                    <Grid item xs={12} sm={8} sx={{ ml: 'auto', mr: 'auto' }}>
                        <Button
                            disabled={isCheckingAuthentication}
                            type="submit"
                            variant="contained"
                            fullWidth>Register</Button>
                    </Grid>
                </Grid>

                <Grid container direction="row" justifyContent="end" sx={{ mt: 2 }}>
                    <Typography sx={{ mr: 1 }}>
                        ¿Ya tienes cuenta?
                    </Typography>
                    <Link component={RouterLink} color="inherit" to="/auth/login">
                        Ingresar
                    </Link>
                </Grid>

            </form>
            
        </AuthLayout>
    )
}

export default RegisterPage
