import React from 'react';
import Home from './Home';
import { MuiThemeProvider } from '@material-ui/core/styles';

function App() {
  return (
    <MuiThemeProvider>
      <Home />
    </MuiThemeProvider>
  );
}

export default App;
