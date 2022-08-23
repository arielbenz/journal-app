import { useEffect, useMemo, useRef } from "react"

import { useDispatch, useSelector } from "react-redux"

import ImageGallery from "../components/ImageGallery"
import { useForm } from "../../hooks/useForm"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeletingNote, startLoadingFiles, startSaveNote } from "../../store/journal/thunks"

import { Grid, Typography, Button, TextField, IconButton } from "@mui/material"
import { SaveOutlined, UploadOutlined, DeleteOutline } from "@mui/icons-material"

import Swal from "sweetalert2"
import "sweetalert2/dist/sweetalert2.css"

const NoteView = () => {

    const dispatch = useDispatch();
    const { activeNote, messageSaved, isSaving } = useSelector(state => state.journal)

    const { title, body, date, onInputChange, formState } = useForm(activeNote)

    const dateString = useMemo(() => {
        const newDate = new Date(date).toUTCString()
        return newDate;
    }, [date])

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch( setActiveNote(formState) );
    }, [formState])

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success')
        }
    }, [messageSaved])

    const onClickSaveNote = () => {
        dispatch(startSaveNote())
    }

    const onFileInputChange = (e) => {
        if (e.target.files === 0)
            return
        
        dispatch(startLoadingFiles(e.target.files))
    }

    const onDeleteNote = () => {
        dispatch(startDeletingNote())
    }

    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight="light">
                    {dateString}
                </Typography>
            </Grid>

            <Grid item>

                <input
                    type="file"
                    multiple
                    ref={ fileInputRef }
                    style={{ display: 'none' }}
                    onChange={onFileInputChange}
                />

                <IconButton
                    color="primary"
                    disabled={isSaving}
                    onClick={ () => fileInputRef.current.click() }
                >
                    <UploadOutlined />
                </IconButton>

                <Button
                    disabled={isSaving}
                    onClick={onClickSaveNote}
                    color="primary">
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Save
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese titulo"
                    label="Titulo"
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={ title }
                    onChange={ onInputChange } />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedió hoy?"
                    minRows={5}
                    name="body"
                    value={ body }
                    onChange={ onInputChange } />
            </Grid>

            <Grid container justifyContent="end">
                <Button
                    onClick={ onDeleteNote }
                    sx={{ mt: 2 }}
                    color="error"
                >
                    <DeleteOutline />
                    Delete
                </Button>
            </Grid>

            <ImageGallery
                images={ activeNote.imageUrls }
            />

        </Grid>
    )
}

export default NoteView
