import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material'
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal/journalSlice';

const SidebarItem = ({ note }) => {

    const { title, body } = note;

    const dispatch = useDispatch();

    const onClickNote = () => {
        dispatch(setActiveNote(note))
    }

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={onClickNote}>
                
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                
                <Grid container>
                    <ListItemText primary={ title } />
                    <ListItemText secondary={ body } />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}

export default SidebarItem
