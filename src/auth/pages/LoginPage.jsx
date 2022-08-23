import { useMemo } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link as RouterLink } from 'react-router-dom'

import { Grid, Typography, TextField, Button, Link, Alert } from "@mui/material"
import { Google } from '@mui/icons-material'

import AuthLayout from "../layout/AuthLayout"
import { useForm } from "../../hooks/useForm"
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth/thunks"

const formData = {
    email: '',
    password: ''
}

const LoginPage = () => {

    // Get properties from redux state
    const { status, errorMessage } = useSelector(state => state.auth);

    // Declare dispatch
    const dispatch = useDispatch();

    const { email, password, onInputChange } = useForm(formData)

    const isAuthenticating = useMemo(() => status === 'checking', [status])

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(startLoginWithEmailPassword({ email, password }))
    }

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn())
    }

    return (

        <AuthLayout title="Login">

            <form
                data-testid="submit-form"
                onSubmit={ onSubmit }
                className="animate__animated animate__fadeIn animate__faster">
                
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Email"
                            type="email"
                            inputProps={{
                                "data-testid": "email"
                            }}
                            placeholder="correo@google.com"
                            fullWidth
                            name="email"
                            value={ email }
                            onChange={ onInputChange } />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Password"
                            type="password"
                            inputProps={{
                                "data-testid": "password"
                            }}
                            placeholder="Password"
                            fullWidth
                            name="password"
                            value={ password }
                            onChange={ onInputChange } />
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid
                        item
                        xs={12}
                        display={ !!errorMessage ? '' : 'none' }>
                        
                        <Alert severity="error">
                            { errorMessage }
                        </Alert>
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={6}>
                        <Button
                            disabled={isAuthenticating}
                            variant="contained"
                            type="submit"
                            fullWidth>Login</Button>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Button
                            disabled={isAuthenticating}
                            variant="contained"
                            onClick={ onGoogleSignIn }
                            data-testid="google-btn"
                            fullWidth>
                            <Google/>
                            <Typography sx={{ ml: 1 }}>Google</Typography>
                        </Button>
                    </Grid>
                </Grid>

                <Grid container direction="row" justifyContent="end" sx={{ mt: 2 }}>
                    <Link component={RouterLink} color="inherit" to="/auth/register">
                        Crear una cuenta
                    </Link>
                </Grid>

            </form>
            
        </AuthLayout>

    )
}

export default LoginPage
