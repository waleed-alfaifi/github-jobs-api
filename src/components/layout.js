import React from 'react';
import { ThemeProvider } from 'styled-components';
import 'twin.macro';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header/header';
import GlobalStyles from './GlobalStyles';
import useTheme from '../hooks/useTheme';

import { JobsProvider } from '../context/JobsContext';

import { darkTheme, lightTheme } from '../themes';

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

  const [theme, toggleTheme] = useTheme();

  return (
    <>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <Header
          siteTitle={data.site.siteMetadata?.title || `Title`}
          toggleTheme={toggleTheme}
          theme={theme}
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
