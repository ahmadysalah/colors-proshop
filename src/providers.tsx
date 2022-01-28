import React, { useMemo } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { darkTheme, lightTheme, GlobalStyle } from './theme';
import useTheme from './Hoc/UseTheme';

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

export const Providers: React.FC = ({ children }) => {
  const { theme } = useTheme();
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <Elements stripe={stripePromise}>
      <HelmetProvider>
        <ThemeProvider theme={currentTheme}>
          <GlobalStyle {...currentTheme} />
          {children}
        </ThemeProvider>
      </HelmetProvider>
    </Elements>
  );
};
