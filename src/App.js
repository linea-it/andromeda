import React from 'react';
import Home from './Home';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme/MaterialTheme';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Home />
    </MuiThemeProvider>
  );
}

export default App;
