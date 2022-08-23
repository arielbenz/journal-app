import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { demoUser } from "../../fixtures/authFixtures"

jest.mock('../../../src/firebase/providers')

describe('Tests on Auth Thunks', () => {

    // Asegurarse que el dispatch haya sido llamado con el valor retornado de checkingCredentials()
    // Evaluamos que el thunk dispare lo que tiene que disparar,
    // ya que la funcionalidad del checkingCredentials() ya fue testeada

    // Defino el dispatch como una función jest
    const dispatch = jest.fn();

    // Limpia todos los mocks
    beforeEach( () => jest.clearAllMocks() );

    test('Debe invocar el checking credentials', async() => {

        // El dispatch es el valor de retorno de la función
        await checkingAuthentication()(dispatch)
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    })

    test('startGoogleSignIn debe llamar checkingCredentials y hacer login exitoso', async() => {

        const resultData = { ok: true, ...demoUser }

        // Hago la llamada al provider que ya está mockeado previamente
        await signInWithGoogle.mockResolvedValue(resultData)

        await startGoogleSignIn()(dispatch)
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(resultData))
    })

    test('startGoogleSignIn debe llamar checkingCredentials y hacer logout al tirar un error', async() => {

        const resultData = { ok: false, errorMessage: 'Un error ha ocurrido en Google' }

        // Hago la llamada al provider que ya está mockeado previamente
        await signInWithGoogle.mockResolvedValue(resultData)

        await startGoogleSignIn()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(logout(resultData.errorMessage))
    })

    test('startCreatingUserWithEmailPassword debe llamar checkingCredentials y hacer login exitoso', async() => {

        const resultData = { ok: true, ...demoUser }
        const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName }

        // Hago la llamada al provider que ya está mockeado previamente y el result es resultData
        await registerUserWithEmailPassword.mockResolvedValue(resultData)

        await startCreatingUserWithEmailPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(resultData))
    })

    test('startLoginWithEmailPassword debe llamar checkingCredentials y hacer login exitoso', async() => {

        const resultData = { ok: true, ...demoUser }
        const formData = { email: demoUser.email, password: '123456' }

        // Hago la llamada al provider que ya está mockeado previamente
        await loginWithEmailPassword.mockResolvedValue(resultData)

        await startLoginWithEmailPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(resultData))
    })

    test('startLogout debe llamar logoutFirebase y logout', async() => {

        await startLogout()(dispatch)

        expect(logoutFirebase).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith(logout())
    })
})