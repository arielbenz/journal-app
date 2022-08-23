import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import SidebarItem from './SidebarItem';

const Sidebar = ({ drawerWidth = 240 }) => {

    const { displayName } = useSelector(state => state.auth)
    const { notes } = useSelector(state => state.journal)

    return (
        <Box component="nav"
            sx={{ 
                width: { sm: `${drawerWidth}px` },
                flexShrink: { sm: 0 }
            }}>

            <Drawer
                variant="permanent"
                open={true}
                sx={{
                    display: { xs: 'block'},
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}>

                <Toolbar>
                    <Typography variant="h6" noWrap>{displayName}</Typography>
                </Toolbar>

                <Divider />

                <List>
                    {
                        notes.map( note => (
                            <SidebarItem
                                key={ note.id }
                                note={ note } 
                            />
                        ))
                    }
                </List>

            </Drawer>

        </Box>
    )
}

export default Sidebar