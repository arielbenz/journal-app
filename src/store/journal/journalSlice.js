import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        activeNote: null
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload)
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.activeNote = action.payload;
            state.messageSaved = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, action) => {
            const updatedNote = action.payload;
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                if (note.id === updatedNote.id ) {
                    return updatedNote;
                }
                return note
            })

            state.messageSaved = `Nota: ${updatedNote.title}, actualizada correctamente.`

        },
        setPhotosToActiveNote: (state, action) => {
            state.activeNote.imageUrls = [ ...state.activeNote.imageUrls, ...action.payload ]
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [],
            state.activeNote = null
        },
        deleteNoteById: (state, action) => {
            const removedNoteId = action.payload;

            state.notes = state.notes.filter( note => note.id !== removedNoteId )
            state.activeNote = null
        },
    }
})

export const {
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
    setPhotosToActiveNote,
    savingNewNote,
    clearNotesLogout
} = journalSlice.actions;