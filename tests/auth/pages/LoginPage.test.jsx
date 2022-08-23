import { configureStore } from "@reduxjs/toolkit"
import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import LoginPage from "../../../src/auth/pages/LoginPage"
import { authSlice } from "../../../src/store/auth/authSlice"
import { MemoryRouter } from 'react-router-dom'
import { notAuthenticatedState } from "../../fixtures/authFixtures"

const mockStartGoogleSignIn = jest.fn()
const mockStartLoginWithEmailPassword = jest.fn()

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({ email, password }) => {
        return () => mockStartLoginWithEmailPassword({ email, password })
    }
}))

// Sobreescribir el comportamiento del useDispatch
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn()
}))

describe('Pruebas en el LoginPage', () => {

    // Necesario cuando uso funciones mock de jest.fn()
    beforeEach(() => jest.clearAllMocks())

    const store = configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: notAuthenticatedState
        }
    })
    
    test('Debe mostrar el componente correctamente', () => {

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1)
        
    })

    test('Boton de google debe llamar el startGoogleSignIn', () => {

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        const googleBtn = screen.getByTestId('google-btn')
        fireEvent.click(googleBtn)

        expect(mockStartGoogleSignIn).toHaveBeenCalled()
    })

    test('Boton de login debe llamar el startLoginWithEmailPassword', () => {

        const email = 'ariel@correo.com'
        const password = '123456'

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        const emailField = screen.getByTestId('email')
        fireEvent.change(emailField, { target: { name: 'email', value: email } })

        const passwordField = screen.getByTestId('password')
        fireEvent.change(passwordField, { target: { name: 'password', value: password } })

        const loginForm = screen.getByTestId('submit-form')
        fireEvent.submit(loginForm)

        expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
            email: email,
            password: password
        })
    })
    

})