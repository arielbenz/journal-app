import { Grid, AppBar, Toolbar, IconButton, Typography } from '@mui/material'
import { MenuOutlined, LogoutOutlined } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { startLogout } from '../../store/auth/thunks';

const Navbar = ({ drawerWidth = 240 }) => {

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(startLogout())
    }

    return (
        <AppBar
            position="fixed"
            sx={{ 
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` }
            }}>

            <Toolbar>
                <IconButton color="inherit" sx={{ mr: 2, display: { sm: 'none'} }}>

                    <MenuOutlined />

                </IconButton>

                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" noWrap component="div">Journal App</Typography>

                    <IconButton color="error" onClick={onLogout}>
                        <LogoutOutlined />
                    </IconButton>
                </Grid>

            </Toolbar>

        </AppBar>
    )
}

export default Navbar
