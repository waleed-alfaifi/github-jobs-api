import React, { useState } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import 'twin.macro';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header/header';

import { JobsProvider } from '../context/JobsContext';

const commonTheme = {
  colors: {
    violet: '#5964E0',
    lightViolet: '#939BF4',
    darkGrey: '#6E8098',
  },
};

const lightTheme = {
  ...commonTheme,
  body: '#f4f6f8',
  backgroundColor: '#ffffff',
  textColor: '#19202D',
  boxShadow: 'rgba(0, 0, 0, 0.1)',
  iconColor: '#6E8098',
  buttonSecondary: {
    backgroundColor: 'rgba(89, 100, 224, 0.1)',
    textColor: '#5964e0',
    hoverColor: 'rgba(89, 100, 224, 0.35)',
  },
};

const darkTheme = {
  ...commonTheme,
  body: '#121721',
  backgroundColor: '#19202D',
  textColor: '#ffffff',
  boxShadow: 'rgba(255, 255, 255, 0.1)',
  iconColor: '#ffffff',
  buttonSecondary: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    textColor: '#ffffff',
    hoverColor: 'rgba(255, 255, 255, 0.35)',
  },
};

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Kumbh Sans', sans-serif;
    background-color: ${({ theme }) => theme.body};
    font-size: 1.6rem;
    
  }
`;

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const [theme, setTheme] = useState('light');

  const toggleTheme = () =>
    theme === 'light' ? setTheme('dark') : setTheme('light');

  return (
    <>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <Header
          siteTitle={data.site.siteMetadata?.title || `Title`}
          toggleTheme={toggleTheme}
        />
        <JobsProvider>
          <div tw="container mx-auto px-10">
            <main>{children}</main>
          </div>
        </JobsProvider>
      </ThemeProvider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
