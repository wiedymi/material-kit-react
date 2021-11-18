import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import routes from 'src/routes';
import { connect } from 'react-redux';

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const { theme } = props;
  const routing = useRoutes(routes);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

const mapStoreToProps = (state) => {
  return {
    theme: state.theme
  };
};

export default connect(mapStoreToProps)(App);
