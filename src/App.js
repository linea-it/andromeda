import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme/MaterialTheme';
import Drawer from './components/Drawer';
import './index.css';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Drawer />
    </MuiThemeProvider>
  );
}

export default App;
