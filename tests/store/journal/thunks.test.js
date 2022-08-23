import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";


describe('Tests on Journal Thunks', () => {

    // Asegurarse que el dispatch haya sido llamado con el valor retornado de checkingCredentials()
    // Evaluamos que el thunk dispare lo que tiene que disparar,
    // ya que la funcionalidad del checkingCredentials() ya fue testeada

    // Defino el dispatch como una función jest
    const dispatch = jest.fn();
    const getState = jest.fn();

    // Limpia todos los mocks
    beforeEach( () => jest.clearAllMocks() );


    test('startNewNote debe crear una nueva nota en blanco', async() => {

        const uid = 'test-uid'

        getState.mockReturnValue({
            auth: {
                uid: uid
            }
        })

        await startNewNote()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith(savingNewNote())

        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
            id: expect.any(String),
            date: expect.any(Number),
            title: '',
            body: '',
            imageUrls: [],
        }))

        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            id: expect.any(String),
            date: expect.any(Number),
            title: '',
            body: '',
            imageUrls: [],
        }))

        // Delete from firebase
        const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
        const docs = await getDocs(collectionRef)

        const deletePromises = []
        docs.forEach( doc => deletePromises.push(deleteDoc(doc.ref)) )
        await Promise.all(deletePromises)


    })
  
})