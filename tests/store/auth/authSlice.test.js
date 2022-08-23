import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { initialState, demoUser, authenticatedState } from "../../fixtures/authFixtures"

describe('Test over the authSlice', () => {
    test('Debe regresar el estado inicial y llamarse "auth"', () => {

        const state = authSlice.reducer(initialState, {})
        expect(authSlice.name).toBe('auth')
        expect(state).toEqual(initialState)
    })
    
    test('Debe realizar la autenticación', () => {
        const state = authSlice.reducer(initialState, login(demoUser))
        expect(state).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null
        })
    })
    
    test('Debe de realizar el logout sin argumentos', () => {
        const state = authSlice.reducer(authenticatedState, logout())
        expect(state).toEqual({
            status: 'no-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        })
    })

    test('Debe de realizar el logout y mostrar mensaje de error', () => {
        const errorMessage = "Las credenciales no son correctas"

        const state = authSlice.reducer(authenticatedState, logout({ errorMessage }))
        expect(state).toEqual({
            status: 'no-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        })
    })

    test('Debe cambiar el estado a checking', () => {
        const state = authSlice.reducer(authenticatedState, checkingCredentials())
        expect(state.status).toBe('checking')
    })

})