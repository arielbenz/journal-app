import { ThemeProvider } from "@mui/material"
import CssBaseline from '@mui/material/CssBaseline';
import purpleTheme from './purpleTheme'

const AppTheme = ({ children }) => {
    return (
        <ThemeProvider theme={ purpleTheme }>
            <CssBaseline />
            { children }
        </ThemeProvider>
    )
}

export default AppTheme
